var express = require('express');
var router = express.Router();

/* GET specific user */
router.post('/', function(req, res, next) {
    // console.log(req.body.email);
 	res.locals.connection.query("UPDATE users set status=!status where id_ijazah='"+ req.body.id +"' ", function (error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
});

module.exports = router;
