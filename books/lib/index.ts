import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import { routes } from './routes';

const app = express();

app.set('port', 5757);

app.use(bodyParser.json());
app.use('/', routes);

const PORT = app.get('port');

const runServer = async () => {
	try {
		await mongoose.connect('mongodb://mongodb_docker:27017/books', {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		app.listen(PORT, () => {
			console.log(`🚀 Server started on port ${PORT}`);
		});
	} catch (e) {
		console.error('Error from runServer', JSON.stringify(e));
	}
};

runServer();
