import * as express from 'express';
import *  as compression from 'compression';
import *  as  bodyParser from 'body-parser';
import {TVMazeShowRouter} from "./routes/TVMazeShowRouter";
import * as mongoose from 'mongoose';
const Agendash = require('agendash');
import Config from "./config";
import {TVMazeCrawlerService} from "./services/TVMazeAPI/TVMazeCrawlerService";
import {AgendaJobsService} from "./services/AgendaJobsService";


export class Server {
    private port = Config.SERVER_PORT;
    private server;

    private static instance: Server;

    private init = false;

    public static getInstance() {
        if (Server.instance == null) {
            this.instance = new Server();
        }
        return this.instance;
    }

    public async setup() {
        if (this.init != true) {
            this.init = true;
            this.server = express();
            await this.setupMiddleware();
            await this.setupConnections();
            await this.routes();
            await this.afterSetup();

            this.server.listen(this.port);
            console.log(`Server listening at http://localhost:${this.port}`);
        }
    }

    private setupMiddleware() {
        this.server.use(compression());
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded({
            extended: true
        }));
    }

    private setupConnections() {
        mongoose.connect(Config.MONGO_URL);

    }

    private async routes() {
        const router = express.Router();
        TVMazeShowRouter.create(router);
        this.server.use(`/api`, router);
        this.server.use(`/dash`, Agendash(await AgendaJobsService.getInstance()))
    }

    private async afterSetup() {
        await TVMazeCrawlerService.setupAgendaBased();
    }
}

Server.getInstance().setup()