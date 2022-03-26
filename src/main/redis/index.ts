import Command from "./command";
import Service from "./service";

class Redis {
  public commands: any;

  init(client: any) {
    this.commands = new Service(new Command(client));
  }
}

export = new Redis();
