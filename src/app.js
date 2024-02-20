import http2 from "node:http2";
import fs from "node:fs";
import { router } from "./router.js";

const server = http2.createSecureServer({
    key: fs.readFileSync('ssl/localhost-key.pem'),
    cert: fs.readFileSync('ssl/localhost-cert.pem'),
});

server.on('error', (err) => console.error(err));

server.on('stream', router);

server.listen(8443); 