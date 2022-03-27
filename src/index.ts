(async () => {
  const { logger } = await import("./main");

  const { server, getConfig, socket, redis } = await import("./connections");

  const { SERVER_PORT } = await getConfig();
  (async () => {
    const promise = await Promise.all([redis(), socket()]);
    const socketClient: any = promise[1];

    

    server.listen(SERVER_PORT, () => {
      logger.info(`===> server listen on ${SERVER_PORT} <====`);
    });
  })();
})();
