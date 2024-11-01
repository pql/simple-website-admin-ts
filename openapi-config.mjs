import OpenAPI from 'openapi-typescript-codegen';

OpenAPI.generate({
  input: 'http://localhost:44362/swagger/v1/swagger.json',
  output: './src/apis',
  httpClient: 'axios',
  useOptions: true,
  exportSchemas: true,
});