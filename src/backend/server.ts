import * as express from 'express';
import *  as compression from 'compression';
import *  as  bodyParser from 'body-parser';
import {TVMazeShowRouter} from "./routes/TVMazeShowRouter";
import * as mongoose from 'mongoose';
// import * as connectMongo from 'connect-mongo';
// import * as session from 'express-session';
// import * as passport from "passport";
import * as path from 'path';
import {TVMazeShowModel} from "./models/TVMazeShowModel";
import {AgendaJobsService} from "./services/AgendaJobsService";

export class Config {
    public static MONGO_URL = "mongodb://localhost:27017/tvmazecrawler"
    public static SESSION = {
        store: null,
        secret: 'dkhy2hd2d',
        cookie: {
            secure: false,
            httpOnly: false,
            maxAge: 30 * 24 * 60 * 60 * 1000
        },
        resave: false,
        saveUninitialized: false,
    }
    public static SERVER_PORT = 3000;

    public static JWT_TOKEN_SECRET = 'G78SVamkozCZxug5fsVdrZ2XGPi4NbBKGheBbgSy';
}


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
            this.server = express();
            this.setupMiddleware();
            this.setupConnections();
            this.routes();
            this.setupFrontend();
            await this.afterSetup();

            this.server.listen(this.port);
            console.log(`Server listening at http://localhost:${this.port}`);
        }
    }

    private setupFrontend() {
        this.server.set('view engine', 'pug');

        this.server.use(express.static(path.join(__dirname, '../dist')));
        this.server.set('views', path.join(__dirname, '/../src/client'));

        this.server.get('/*', function (req, res) {
            res.render('index');
        });
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

        // const MongoStore = connectMongo(session);

        // const SessionStore = new MongoStore({
        //     mongooseConnection: mongoose.connection
        // });
        // global['SessionStore'] = SessionStore;
        // Config.session.store = SessionStore;
        //
        // this.server.use(session(Config.session));
        // this.server.use(passport.initialize());
        // this.server.use(passport.session());
        // PassportService.initiateStrategies(passport);
        // global['Passport'] = passport;

    }

    private routes() {
        const router = express.Router();
        // UserRoute.create(router);
        // NoteRoute.create(router);
        // TaxonomyRoute.create(router);
        // AuthRoute.create(router);
        TVMazeShowModel.create(router);
        this.server.use(`/api`, router);
    }

    private afterSetup() {
        AgendaJobsService.getInstance()
    }
}


Server.getInstance();