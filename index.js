import { PORT } from './src/util/config.js';
import app from './src/app.js';
import { connectToDatabase } from './src/db.js';

const start = async () => {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

start();
