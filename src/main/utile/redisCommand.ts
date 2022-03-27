import Redis from "../redis";

// User Detail
function setUser(userId:number, data:any) {
    const key = `USER:${userId}`
    return Redis.commands.setValueInKeyWithExpiry(key,data)
}

function getUser(userId:number) {
    const key = `USER:${userId}`
    return Redis.commands.getValueFromKey(key)
}

const exportObject = {
    setUser,
    getUser
}

export = exportObject