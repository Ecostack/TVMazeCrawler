import {TVMazeShowModel} from "../../models/TVMazeShowModel";

export class TVMazeCrawlerService {
    public static run() {
        TVMazeShowModel.find({}).sort({tvmazeid:-1})
    }
}