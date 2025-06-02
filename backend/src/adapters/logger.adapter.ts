import {createLogger, format, transports, Logger } from "winston"

export interface ILoggerAdapter {
  file: string;
  writeInfo: (message: string) => void;
  writeDebug: (message: string) => void;
  writeWarn: (message: string) => void;
  writeError: (message: string) => void;
}

export class WinstonLoggerAdapter implements ILoggerAdapter {
  public file: string
  private logger: Logger

  constructor(file: string) {
    this.file = file
    this.logger = createLogger({
      level: "debug",
      format: format.combine(
        format.timestamp(),
        format.printf(({ level, message, timestamp, ...meta }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${message} ${JSON.stringify(
            meta
          )}`;
        })
      ),
      transports: [new transports.Console()],
    });
  }

  writeInfo(message: string) {
    this.logger.info(message)
  }
  writeDebug(message: string) {
    this.logger.debug(message)
  }
  writeWarn(message: string) {
    this.logger.warn(message)
  }
  writeError(message: string) {
    this.logger.error(message)
  }
}
