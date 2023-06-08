/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL_AUTH: string;
  readonly VITE_BASE_URL_SALES: string;
  readonly VITE_BASE_URL_ORDER: string;
  readonly VITE_BASE_URL_REPORT: string;
  readonly VITE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
