const corsWhiteList = [
  process.env.CLIENT_BASE_URL
];

const corsOptions = {
    origin: (origin, callback) => {
        if(corsWhiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;