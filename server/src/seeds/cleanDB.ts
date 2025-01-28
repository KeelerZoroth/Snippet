import { Snippet, User } from "../models/index.js";

const cleanDB = async () => {
    try {
        await Snippet.deleteMany({});
        console.log('Snippet collection obliterated!💥');

        await User.deleteMany({});
        console.log('User collection obliterated!💥');
        
    } catch (err: any) {
        console.error(err.message);
        process.exit(1)
    }
}

export default cleanDB;