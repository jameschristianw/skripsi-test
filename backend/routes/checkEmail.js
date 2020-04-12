var express = require('express');
var router = express.Router();

/* GET specific user */
router.post('/', function(req, res, next) {
    console.log(req.body.email);
 	res.locals.connection.query("SELECT email from users where email='" + req.body.email + "'", function (error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
});

module.exports = router;
