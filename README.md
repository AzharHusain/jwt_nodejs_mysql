# token-based-authentication
Youtube tutorial on Node.JS token based authentication with JWT and Angular

Tutorial Available at : https://youtu.be/toRmWFzB6-E

## This examples uses MySql as database

Plese create following table in your database for this to work.

1) users


| Field       | Type             | Null | Key | Default | Extra          |
|-------------|------------------|------|-----|---------|----------------|
| email       | varchar(150)     | YES  | UNI | NULL    |                |
| username    | varchar(150)     | YES  |     | NULL    |                |
| password    | varchar(240)     | YES  |     | NULL    |                |
| creation_dt | timestamp        | YES  |     | NULL    |                |
| id          | int(10) unsigned | NO   | PRI | NULL    | auto_increment |


### You can modify your db connection settings in backend/db/config.js