// @ts-ignore
import "dotenv/config";
// @ts-ignore
import { defineConfig, env } from "prisma/config";

export default defineConfig({
    schema: "schema.prisma",
    migrations: {
        path: "migrations",
    },
    datasource: {
        url: env("DATABASE_URL") || 'file:./dev.db',
    },
});
