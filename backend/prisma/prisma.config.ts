// @ts-ignore
export default {
    datasources: {
        db: {
            // @ts-ignore
            url: process.env.DATABASE_URL || 'postgresql://localhost:5432/bayg_db?schema=public'
        }
    }
};
