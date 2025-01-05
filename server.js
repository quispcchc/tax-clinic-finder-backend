const dotenv = require('dotenv');
dotenv.config();

const app = require('./src/app');
const sequelize = require('./src/config/database');
const { logger } = require('./src/config/logger');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connected successfully');
    await sequelize.sync({ alter: true });
    logger.info('Database synced');
    
    app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error('Error starting server:', error);
    process.exit(1);
  }
})();
