import mongoose from 'mongoose';
import EnvHelper from "./env.helper";

async function connect() {
  try {
    await mongoose.connect(EnvHelper.getDatabase())

    logger.info('Database Connected')
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error);
  }
}

export default connect;
