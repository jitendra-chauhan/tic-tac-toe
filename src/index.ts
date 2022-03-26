(async () => {
  console.log("===> call server <===");
  const { server, getConfig } = await import("./connections");

  const { SERVER_PORT } = await getConfig();

  server.listen(SERVER_PORT, () => {
    console.log(`===> server listen on ${SERVER_PORT} <====`);
  });
})();
