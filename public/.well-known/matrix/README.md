# Matrix delegation: never delete these files

`server` and `client` in this folder make `ramimaalouf.com` the name of Rami's Matrix
server (user IDs like `@rami:ramimaalouf.com`), while the server itself runs at
`matrix.ramimaalouf.com`.

- `server` tells other Matrix servers where to send messages (federation).
- `client` tells apps (Element X, Multiplexer) where the server is.

**Never delete or rename them.** A Matrix server name cannot change after the install.
Without these files, other servers cannot reach `@rami:ramimaalouf.com`, and apps
cannot find the server from the user ID.

They must stay the same as the files that the server generates at
`https://matrix.ramimaalouf.com/.well-known/matrix/server` and `.../client`. The
server's self-check (`--tags=self-check`) compares them. `vercel.json` serves them as
JSON, and `client` with `Access-Control-Allow-Origin: *` for web apps.

The server's setup is in the Multiplexer repo, folder `server/`.
