import db from '../config/connection.js';
import { Snippet, User } from '../models/index.js';
import cleanDB from './cleanDB.js';
import userData from './userData.json' assert { type: 'json' };
import snippetData from './snippetData.json' assert { type: 'json' };

const seed = async () => {
    try {
        await db();
        await cleanDB();
        
        await Snippet.insertMany(snippetData);
        await User.create(userData);
        console.log("Look at all this data we've found!💲")
        process.exit(0)
    } catch (err: any) {
        console.error(err.message)
        process.exit(1)
    }
}

seed()