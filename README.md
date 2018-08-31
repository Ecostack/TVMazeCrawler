# TVMazeCrawler

### Api available

/api/tvshows [offset(default 0),limit(default 20)]

### Required tooling

Mongo database on port 27017.

Mongo URL is configurable with the environment variable *MONGO_URL*.

### Startup

Test: **yarn start**

Production: **pm2 start pm2-startup.json**

### Api being used

https://tvcrawler.techstack.de/api
