import { playingTableIf } from "../interface/playingTableIf";
import Redis from "../redis";

// User Detail
function setUser(userId: number, data: any) {
    try {
        
        const key = `USER:${userId}`;
        return Redis.commands.setValueInKeyWithExpiry(key, data);
    } catch (error) {
        console.log('===> setUser <===',error)
    }
}

function getUser(userId: number) {
  const key = `USER:${userId}`;
  return Redis.commands.getValueFromKey(key);
}

// add table in queue so find a how table is empty site
const popTableFromQueue = async () =>
  Redis.commands.popFromQueue("playingTable");

const pushTableInQueue = async (data: any) =>
  Redis.commands.pushIntoQueue("playingTable", data);

// tableData functions
const setTableData = async (data: playingTableIf) => {
  const { id } = data;
  const key = `PT:${id}`;
  await Redis.commands.setValueInKeyWithExpiry(key, data);

  return id;
};

const getTableData = async (tableId: number): Promise<playingTableIf> => {
  return Redis.commands.getValueFromKey(`PT:${tableId}`);
};

const removeTableData = async (tableId: string) =>
  Redis.commands.deleteKey(`PT:${tableId}`);

const exportObject = {
  setUser,
  getUser,
  popTableFromQueue,
  pushTableInQueue,
  setTableData,
  getTableData,
  removeTableData,
};

export = exportObject;
