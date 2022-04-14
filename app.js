require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

const graphqlResolvers = require('./graphql/resolvers/index');
const graphqlSchema = require('./graphql/schema/index');
const isAuth = require('./middleware/check-auth');
const HttpError = require('./model/http-Error');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(isAuth);

app.use(
	'/graphql',
	graphqlHttp.graphqlHTTP({
		schema: graphqlSchema,
		rootValue: graphqlResolvers,
		graphiql: true,
	})
);

app.use((req, res, next) => {
	const error = new HttpError('Could not found this route!', 404);
	return next(error);
});

app.use((error, req, res, next) => {
	if (req.headerSent) {
		return next(error);
	}

	res.status(error.code || 500).json({ message: error.message });
});

mongoose
	.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.x0ngv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
	)
	.then(() => {
		app.listen(5000);
		console.log('mongodb connected!');
	})
	.catch(err => {
		console.log(err);
	});
