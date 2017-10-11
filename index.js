const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());

const queryHandler = require(__dirname + '/queryHandler');

const PORT = process.env.API_PORT || process.env.PORT || 8080;

app.use('/', express.static(__dirname + '/docs'));

app.get('/providers', (req, res) => {
	queryHandler.execute(queryHandler.parse(req.query), (err, rows) => {
		if(err) res.status(500).send(err);
		else res.send(rows);	
	});
});

app.get('/fields', (req, res) => {
	res.send(queryHandler.getFields());
});


server = app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
