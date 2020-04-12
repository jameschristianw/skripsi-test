var express = require('express');
var router = express.Router();

/* GET specific user */
router.post('/', function(req, res, next) {
 	res.locals.connection.query("SELECT * from users where email='" + req.body.email +  "' and password='"+ req.body.password + "'", function (error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
});

module.exports = router;
