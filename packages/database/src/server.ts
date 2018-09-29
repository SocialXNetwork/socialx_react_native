import express from 'express';

import Gun from 'gun';
import 'gun/nts';

import path from 'path';

const PORT = process.env.PORT || 8765;

const app = express();

app.use(Gun.serve);

const server = app.listen(PORT);

Gun({ file: path.resolve(__dirname, '../data'), web: server });

console.log(`Gun server listening on http://localhost:${PORT}/gun`);
