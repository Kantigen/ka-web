import * as util from 'app/util';

const environment = {
  getApiKey() {
    return import.meta.env.KA_API_KEY;
  },

  getAssetsUrl() {
    return util.ensureTrailingSlash(import.meta.env.KA_ASSETS_URL);
  },

  getServerUrl() {
    return util.ensureTrailingSlash(import.meta.env.KA_SERVER_URL);
  },
};

export default environment;
