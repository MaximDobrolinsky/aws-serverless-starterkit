import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'aws-serverless-starterkit',
  frameworkVersion: '3',
  package: {
    individually: true,
    path: './build',
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
