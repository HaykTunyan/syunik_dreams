import "server-only";
import pino from "pino";
import { env } from "@/server/config/env";

const logger = pino({
  level: env.NODE_ENV === "production" ? "info" : "debug",
  ...(env.NODE_ENV !== "production"
    ? {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:HH:MM:ss",
            ignore: "pid,hostname",
          },
        },
      }
    : {}),
  base: {
    env: env.NODE_ENV,
  },
  redact: ["req.headers.authorization", "req.headers.cookie", "*.password", "*.token"],
  serializers: {
    err: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },
});

export { logger };
export type Logger = typeof logger;
