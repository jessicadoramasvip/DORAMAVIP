import { copyFile } from 'node:fs/promises';
await copyFile('index.html', 'public/index.html');
