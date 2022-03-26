const {
  format: { printf, timestamp, combine },
} = require('winston');

const logFormat = printf(
  ({ level, message, timestamp: ts }:any) => `${ts} [${level}]: ${message}`,
);

export = combine(timestamp(), logFormat);
