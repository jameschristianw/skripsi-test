var express = require('express');
var router = express.Router();

/* GET specific user */
router.post('/', function(req, res, next) {
    // console.log(req.body.email);
 	res.locals.connection.query("INSERT INTO users(role, fullname, email, password, id_ijazah) VALUES('student', '"+ req.body.name +"','" + req.body.email + "', '"+req.body.password+"', '"+ req.body.ijazah+"')", function (error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
});

module.exports = router;
