import express from 'express';
import helmet from 'helmet';
import responseTime from 'response-time';
import cors from 'cors';
import bodyParser from 'body-parser';
import Logger from '../config/logger';
import morgan from 'morgan';
import userAuthRoute from '../apps/auth/routes/userAuthRoute';
import adminAuthRoute from '../apps/auth/routes/adminAuthRoute';
import userRoute from '../apps/user/routes/userRoute';
import mediaRoute from '../apps/media/routes/mediaRoutes';
import client from 'prom-client';
import verificationRoute from '../apps/verification/routes/verificationRoute';

const app = express();

const restResponseTimeHistogram = new client.Histogram({
  name: 'rest_response_time_duration_seconds',
  help: 'REST API response time in seconds',
  labelNames: ['method', 'route', 'status_code'],
});

const databaseResponseTimeHistogram = new client.Histogram({
  name: 'db_response_time_duration_seconds',
  help: 'Database response time in seconds',
  labelNames: ['operation', 'success'],
});

global.logger = Logger.createLogger({ label: 'Parrot Backend' });
app.use(
  responseTime((req, res, time) => {
    const routePath = req.route?.path || req.path;
    // Capture the route and label the metrics
    restResponseTimeHistogram.observe(
      {
        method: req.method,
        route: routePath,
        status_code: res.statusCode,
      },
      time * 1000
    );
  })
);

app.use(helmet());
app.use(cors({}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: logger.stream }));

app.use(`/healthcheck`, (req, res) => {
  res.status(200).send('Parrot Backend is online and healthy techies');
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.send(await client.register.metrics());
});

// ## AUTH ROUTES ##
app.use('/auth', userAuthRoute);
app.use('/auth', adminAuthRoute);

// ## User ROUTES ##
app.use('/user', userRoute);

// ## Media ROUTES ##
app.use('/media', mediaRoute);

// ## Verification ROUTES ##
app.use('/verification', verificationRoute);

app.get('/', (req, res) => {
  res.status(200).send('Parrot Backend is online and healthy techies');
});

export default app;
