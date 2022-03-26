
(async () => {
  const { logger } = await import("./main");
  
  const { server, getConfig, socket, redis } = await import("./connections");

  const { SERVER_PORT } = await getConfig();

  await Promise.all([redis(), socket()]);

  server.listen(SERVER_PORT, () => {
    logger.info(`===> server listen on ${SERVER_PORT} <====`);
  });
})();
