import db from '../config/connection.js';
import { Snippet, User } from '../models/index.js';
import cleanDB from './cleanDB.js';
import userData from './userData.json';
import snippetData from './snippetData.json';

const seed = async () => {
    try {
        await db();
        await cleanDB();
        
        await Snippet.insertMany(snippetData);
        await User.create(userData);
        console.log("Look at all this data we've found!💲")
    } catch (err: any) {
        console.error(err.message)
    }
}

seed()