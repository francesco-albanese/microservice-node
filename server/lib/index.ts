import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.set('port', 5757);

app.get('/', (req, res, next) => {
	res.send('Hello World!');
});

const PORT = app.get('port');

const runServer = async () => {
	try {
		await mongoose.connect('mongodb://mongodb_docker:27017/microservices', {
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
