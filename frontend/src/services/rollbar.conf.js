//import * as dotenv from 'dotenv'
//dotenv.config()

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
};

export default rollbarConfig;