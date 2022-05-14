/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly KA_ASSETS_URL: string;
  readonly KA_SERVER_URL: string;
  readonly KA_WS_SERVER_URL: string;
  readonly KA_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
