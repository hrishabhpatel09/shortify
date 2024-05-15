import mongoose from "mongoose";

export interface URI extends Document{
    originalUrl: string,
    shortUrl:string
}
const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
        unique: true
    },
    shortUrl:{
        type: String,
        required: true,
        unique: true
    }
},{timestamps: true})

const urlModel = mongoose.models.Urls as mongoose.Model<URI> || mongoose.model('Urls',urlSchema);

export default urlModel;