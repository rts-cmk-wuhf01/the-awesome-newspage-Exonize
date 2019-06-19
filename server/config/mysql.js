const mysql = require('mysql2/promise'); // mysql

module.exports = {
   connect: function () {
      return mysql.createConnection({
         host: 'localhost',
         user: 'root',
         password: '',
         port: '3306',
         database: 'thenewspaper'
      })
   }
}