import cors from 'cors';
import express from 'express';
import fs from 'fs';
import https from 'https';
import mongoose from 'mongoose';
import router from './router.js';

const PORT = 5577;
const DB_URL = `mongodb+srv://zheenbekovrai333:10.06.2003ZhRS@cluster0.4hbl7wo.mongodb.net/db?retryWrites=true&w=majority&appName=Cluster0`;
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', router);

const httpsOptions = {
	key: fs.readFileSync('server.key'),
	cert: fs.readFileSync('server.cert'),
};

const server = https.createServer(httpsOptions, app);

const startApp = async () => {
	try {
		await mongoose.connect(DB_URL);
		server.listen(PORT, () =>
			console.log(`Сервер запущен на порту ${PORT}`)
		);
	} catch (error) {
		console.log(error);
	}
};
startApp();
