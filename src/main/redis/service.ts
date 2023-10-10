class Service {
  public command: any;

  constructor(command: any) {
    this.command = command;
  }

  /* set queries */
  async setValueInKey(key: any, obj: any) {
    return this.command.KEY.set(key, JSON.stringify(obj));
  }
  /* set queries with expire time */
  async setValueInKeyWithExpiry(key: any, obj: any, exp = 700) {
    return this.command.KEY.setex(key, exp, JSON.stringify(obj));
  }

  /* get queries */
  async getValueFromKey(key: any) {
    const valueStr = await this.command.KEY.get(key);
    return JSON.parse(valueStr);
  }

  /* list queries */
  async pushIntoQueue(key: any, element: any) {
    return this.command.QUEUE.push(key, JSON.stringify(element));
  }

  async popFromQueue(key: any) {
    const resStr = await this.command.QUEUE.pop(key);
    return JSON.parse(resStr);
  }

  /* delete queries */
  async deleteKey(Key: any) {
    return this.command.KEY.delete(Key);
  }
}
export = Service;
