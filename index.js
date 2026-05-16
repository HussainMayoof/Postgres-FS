import { PORT } from './src/util/config.js';
import app from './src/app.js';
import { connectToDatabase } from './src/util/db.js';
import { syncModels } from './src/models/index.js';

const start = async () => {
    await connectToDatabase();
    await syncModels();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

start();
