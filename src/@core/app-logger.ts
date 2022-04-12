import pino from "pino";

export type ILogger = pino.Logger;

class Logger {
  constructor() {}
  create(): ILogger {
    return pino({
      base: {},
      timestamp: () => `,"time":"${new Date().toISOString()}"`,
      level: process.env.DEBUG_LEVEL || "info",
    });
  }
}

export const logger = new Logger().create();
