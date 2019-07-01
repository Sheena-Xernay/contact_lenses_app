const express = require('express');
const Datastore = require('nedb');
const app = express();
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Starting server at ${port}`);
});

app.use(express.static('public'));
app.use(express.json({limit:'1mb'}))

const database = new Datastore('database.db');
database.loadDatabase();

app.post('/api_user', (request, response) => {
	console.log('I GOT A request');

	const data = request.body;
	const timestamp = Date.now();
	data.timestamp = timestamp;

	database.insert(data);
	response.json(data);

});

app.get('/api_user',(request,response) =>{
	database.find({username:{$exists:true}},(err,data)=>{
		if(err){
			response.end();
			return;
		}
		response.json(data);
	})
})

// @TODO add auth middleware
// @TODO add registration page
// @TODO add logout route