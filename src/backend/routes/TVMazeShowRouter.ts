import {RouterHelper} from "./RouterHelper";
import * as mongoose from 'mongoose';
import {TVMazeShowModel} from "../models/TVMazeShowModel";

export class TVMazeShowRouter {
    private static  ROUTER_PREFIX = 'tvshows';

    public static create(router) {
        router.get(`/${this.ROUTER_PREFIX}/`, RouterHelper.asyncMiddleware(async (req, res, next) => {
            if (req.query.limit === undefined || req.query.offset === undefined ) {
                throw Error(`Parameter offset or limit is not correctly specified`);
            }

            let result = {
                results: await TVMazeShowModel.find()
            };

            res.json(await TVMazeShowModel.find());
        }));

        router.get(`/${this.ROUTER_PREFIX}/:id`, RouterHelper.asyncMiddleware(async (req, res, next) => {
            res.json(await TVMazeShowModel.findById(mongoose.Types.ObjectId(
                req.params.id)));
        }));

        // router.post(`/${UserRoute.ROUTER_PREFIX}/`, RouterHelper.asyncMiddleware(async (req, res, next) => {
        //     res.json(await TVMazeShowModel.create(req.body));
        //
        // }));
        //
        // router.put(`/${UserRoute.ROUTER_PREFIX}/:id`, RouterHelper.asyncMiddleware(async (req, res, next) => {
        //     res.json(await TVMazeShowModel.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id), req.body));
        //
        // }));
        //
        // router.delete(`/${UserRoute.ROUTER_PREFIX}/:id`, RouterHelper.asyncMiddleware(async (req, res, next) => {
        //     res.json(await TVMazeShowModel.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id), req.body))
        // }));
    }
}