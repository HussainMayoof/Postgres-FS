import { rollbackMigration } from './db.js';

rollbackMigration().catch((error) => {
    console.log(error);
    process.exit(1);
});
