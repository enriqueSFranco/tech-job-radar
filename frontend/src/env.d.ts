/// <reference types="@rsbuild/core/types" />

interface ImportMetaEnv {
  readonly API_URL: string;
  readonly API_JOBS: string;
  readonly API_RECOMMENDATIONS: string;
  readonly PORT: string;
  // agrega aquí otras variables que uses
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
