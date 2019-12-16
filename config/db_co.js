let mysql = require('mysql');
let connexion = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'healthyprojectdb'
});
connexion.connect()

module.exports = connexion