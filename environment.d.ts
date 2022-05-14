declare global {
  namespace NodeJS {
    interface ProcessEnv {
      KA_ASSETS_URL: string;
      KA_SERVER_URL: string;
      KA_WS_SERVER_URL: string;
      KA_API_KEY: string;
    }
  }
}

export {};
