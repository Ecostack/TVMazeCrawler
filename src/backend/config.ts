export default class Config {
    public static MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/tvmazecrawler"
    public static SERVER_PORT = process.env.PORT || 3000;
}