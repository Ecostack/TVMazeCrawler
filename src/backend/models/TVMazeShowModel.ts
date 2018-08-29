import * as mongoose from 'mongoose';

const TVMazeShowSchema = new mongoose.Schema({
    tvmazeid: Number,
    name: String,
    cast: [{
        id: String,
        name: String,
        birthday: String
    }]
});

TVMazeShowSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

TVMazeShowSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        return ret
    }
});

export const TVMazeShowModel = mongoose.model('TVMazeShow', TVMazeShowSchema);
