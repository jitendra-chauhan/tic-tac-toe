// const { promisify } = require('util');
import { promisify } from "util";

class Command {
  public KEY: any;
  public QUEUE: any;

  constructor(client: any) {
    this.KEY = {
      set: promisify(client.set).bind(client),
      setex: promisify(client.setex).bind(client),
      get: promisify(client.get).bind(client),
      delete: promisify(client.del).bind(client),
      setnx: promisify(client.setnx).bind(client),
    };

    this.QUEUE = {
      push: promisify(client.rpush).bind(client),
      pop: promisify(client.lpop).bind(client),
    };
  }
}

export = Command;
