import config from './config';
import connect from './database';
import express from 'express';
import { AppRouter } from './AppRouter';
import { desirializeUser } from './middleware';
import { Request, Response } from 'express';

import('./controller/user.controller');
import('./controller/session.controller');
import('./controller/shoppingList.controller');

const port = config.port as number;
const host = config.host as string;

const app = express();

app.use(desirializeUser);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(AppRouter.getInstance());   

app.get('/healthcheck', (req: Request, res: Response) => { res.send('App works!'); });

app.listen(port, host, () => {
    console.log(`Server listening at http://${host}:${port}`);
    
    connect();
});