const http2 = require("http2");
const fs = require("fs");

const PORT = 443;

const server = http2.createSecureServer({
  key: fs.readFileSync("localhost-private.pem"),
  cert: fs.readFileSync("localhost-cert.pem"),
});

server.on("stream", (stream, headers) => {
  stream.respond({
    "content-type": "application/json",
    status: 200,
  });

  stream.end(JSON.stringify({
    user: "TestUserData",
    id: "123123123123123123123123123",
  }));

});


try {
  server.listen(PORT);

  console.log(`listening on port ${PORT}`)
} catch (err) {
  console.log(`Server error ${err.toString()}`);
}




