import { PrismaClient } from '../../.prisma/client/client.js';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '../../dev.db');

const libsql = createClient({
    url: `file:${dbPath}`,
});

const adapter = new PrismaLibSql(libsql);
const prisma = new PrismaClient({ adapter });

export default prisma;
