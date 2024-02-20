import { describe, expect, test } from '@jest/globals';
import http2 from "node:http2";
import fs from "node:fs";

describe('GET Endpoint Test', () => {
    test('should return status 200', async () => {
        const client = http2.connect('https://localhost:8443', {
            ca: fs.readFileSync('ssl/localhost-cert.pem'),
        });

        client.on('error', (err) => console.error('Błąd połączenia:', err));

        const req = client.request({
            ':path': '/',
        });

        req.on('response', (headers) => {
            expect(headers[':status']).toBe(200);
            client.close();
        });

        req.end();
    });
});