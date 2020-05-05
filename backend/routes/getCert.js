var express = require('express');
var router = express.Router();

/* GET specific user */
router.get('/', function(req, res, next) {
    // console.log(req.body.email);
 	res.locals.connection.query("SELECT * from users where id_ijazah!=''", function (error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
});

module.exports = router;
