const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');

const app = express();
const logger = require('./utils/logger').getLogger();
const db = require('./models/index');

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

db.sequelize.sync();

// Overwrite data
// db.sequelize.sync({ force: true });

app.use('/user/', require('./routes/user_router'));

// set port, listen for requests
const PORT = process.env.PORT || config.port;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}.`);
});

