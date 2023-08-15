import { INestiaConfig } from '@nestia/sdk';
const config: INestiaConfig = {
  input: 'src/**/*.controller.ts',
  output: 'src/api',
  distribute: 'packages/api',
  swagger: {
    output: './swagger.json',
    security: {
      bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
    servers: [
      {
        url: 'http://127.0.0.1:8000',
        description: 'Local Server',
      },
    ],
  },
};
export default config;
