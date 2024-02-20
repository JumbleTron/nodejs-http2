const helloWorldHandler = (stream, headers) => {
    console.log({ headers })
    stream.respond({
        ':status': 200
    })
    stream.end(JSON.stringify( { "msg": 'Hello world' } ))
}

const usersHandler = (stream, headers) => {
    console.log({ headers })
    stream.respond({
        ':status': 200
    })
    stream.end(JSON.stringify({ users: [] }));
}

const notFoundHandler = (stream, headers) => {
    stream.respond({
        'content-type': 'application/json;',
        ':status': 404
    })
    stream.end(JSON.stringify({ error: 'Not found' }))
}

export const router = (stream, headers) => {
    const path = headers[':path']
    const method = headers[':method']

    let handler = notFoundHandler;

    if (path === "/" && method === 'GET') {
        handler = helloWorldHandler
    }

    if (path === "/users" && method === 'GET') {
        handler = usersHandler
    }

    handler(stream, headers)
}
