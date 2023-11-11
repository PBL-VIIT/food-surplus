const mysql = require("mysql")
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'surplus'
})
con.connect((err) => {
    if (err) {
        console.warn(err);
    }
    else {
        console.warn("Connected");
    }
})

module.exports = con;