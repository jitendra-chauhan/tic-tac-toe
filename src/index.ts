(async () => {
  console.log("===> call server <===");
  const { server, getConfig, socket, redis } = await import("./connections");

  const { SERVER_PORT } = await getConfig();

  await Promise.all([redis(), socket()]);

  server.listen(SERVER_PORT, () => {
    console.log(`===> server listen on ${SERVER_PORT} <====`);
  });
})();
