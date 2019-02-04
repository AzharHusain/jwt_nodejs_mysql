var express = require('express');
var router = express.Router();
var mysql = require('../db/config');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {


  const connection = await mysql.getConnection();

  const sql = `INSERT INTO users (email, username, password, creation_dt) values ('${req.body.email}', '${req.body.username}', '${bcrypt.hashSync(req.body.password, 10)}', '${new Date().toISOString().slice(0, 19).replace('T', ' ')}')`
  connection.query(sql, (err, result) => {
    connection.release();
    if (err) {
      console.log(err);
      return res.status(501).json({ message: 'Error registering user.' })
    }
    return res.status(200).json(result);
  });

})

router.post('/login', async (req, res) => {

  const connection = await mysql.getConnection();
  const sql = `SELECT * FROM USERS WHERE EMAIL='${req.body.email}'`;
  connection.query(sql, (err, result) => {
    connection.release();
    if (err) {
      return res.status(500).json({ message: 'Error in login.' })
    }
    if (result[0]) {
      if (bcrypt.compareSync(req.body.password,result[0].password)) {
        let token = jwt.sign({ username: result[0].username }, 'secret', { expiresIn: '3h' });
        return res.status(200).json(token);
      }
      else {
        return res.status(500).json({ message: 'Invalid Credentials' });
      }
    }
    else {
      return res.status(500).json({ message: 'User email is not registered.' })
    }
  });
});

  router.get('/username', verifyToken, function (req, res, next) {
    return res.status(200).json(decodedToken.username);
  })

  var decodedToken = '';
  function verifyToken(req, res, next) {
    let token = req.query.token;

    jwt.verify(token, 'secret', function (err, tokendata) {
      if (err) {
        return res.status(400).json({ message: ' Unauthorized request' });
      }
      if (tokendata) {
        decodedToken = tokendata;
        next();
      }
    })
  }

  module.exports = router;
