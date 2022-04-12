import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'service-composite-thingpayload-v2-lambda',
  frameworkVersion: '3',
  package: {
    individually: true,
  },
  variablesResolutionMode: '20210326',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: 'development',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {},
    timeout: 15,
    region: 'us-east-1',
  },
  functions: {
    application: {
      handler: 'src/controllers/application.hello',
      events: [
        {
          http: {
            method: 'GET',
            path: 'hello',
            cors: true,
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
