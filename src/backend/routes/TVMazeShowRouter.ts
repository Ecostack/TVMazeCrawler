import {RouterHelper} from "./RouterHelper";
import {TVMazeShowModel} from "../models/TVMazeShowModel";

export class TVMazeShowRouter {
    private static  ROUTER_PREFIX = 'tvshows';

    public static create(router) {
        router.get(`/${this.ROUTER_PREFIX}/`, RouterHelper.asyncMiddleware(async (req, res, next) => {
            const limit = req.query.limit || 20;
            const offset = req.query.offset || 0;

            res.json(await TVMazeShowModel.find().sort({tvmazeid:1}).limit(limit).skip(offset));
        }));
    }
}