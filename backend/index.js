const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const cors = require('cors');

const app = express();
const logger = require('./utils/logger').getLogger();
const db = require('./models/index');

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

db.sequelize.sync();

// Overwrite data
// db.sequelize.sync({ force: true });

app.use('/user/', require('./routes/user_router'));
app.use('/groups/', require('./routes/groups_router'));

// set port, listen for requests
const PORT = process.env.PORT || config.port;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}.`);
});

