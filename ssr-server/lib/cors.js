const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config();

const setUpCors = (app) => {

    app.use(
        cors({
          origin:process.env.URL_ORIGIN,
          credentials:true,
        })
      );

}

module.exports = setUpCors;