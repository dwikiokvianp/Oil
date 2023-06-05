/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL_AUTH: string;
  readonly VITE_BASE_URL_SALES: string;
  readonly VITE_BASE_URL_ORDER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
