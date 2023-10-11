import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/authRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);
app.use(cors());
app.options('*', cors());

// App routes
app.use('/api/v1', authRoutes);

export default app;
