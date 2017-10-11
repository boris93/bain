const express = require('express');
const app = express();
const queryHandler = require(__dirname + '/queryHandler');

const PORT = process.env.API_PORT || process.env.PORT || 8080;

app.get('/providers', (req, res) => {
	queryHandler.execute(queryHandler.parse(req.query), (err, rows) => {
		if(err) res.status(500).send(err);
		else res.send(rows);	
	});
});

server = app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
