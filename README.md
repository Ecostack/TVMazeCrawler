# TVMazeCrawler
This project crawles the available shows on the TV Maze API, their casts and makes it available via a public API.

## Motiviation
This project has been written for an assignment.

## Required tooling

Mongo database on port 27017.

Mongo URL is configurable with the environment variable *MONGO_URL*.

## Startup

Test: **yarn start**

Production: **pm2 start pm2-startup.json**

## Api available

/api/tvshows [offset(default 0),limit(default 20)]

## Tech/Frameworks used
<b>Built with</b>
- [Express.js](https://expressjs.com)
- [Agenda](https://agendajs.com)
- [Mongoose](https://mongoosejs.com/)
- [TV Maze API](https://tvcrawler.techstack.de/api)

## License
GNU GPL, see license file


