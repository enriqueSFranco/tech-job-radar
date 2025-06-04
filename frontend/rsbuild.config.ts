import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    define: {
      'import.meta.env.API_URL': JSON.stringify(process.env.API_URL),
      'import.meta.env.API_JOBS': JSON.stringify(process.env.API_JOBS),
      'import.meta.env.API_RECOMMENDATIONS': JSON.stringify(process.env.API_RECOMMENDATIONS),
      'import.meta.env.PORT': JSON.stringify(process.env.PORT),
    },
  },
});
