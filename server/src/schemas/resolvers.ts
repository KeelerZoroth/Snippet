import { Snippet, User } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js'; 
import { explainCode } from '../utils/openAI.js';

// Define types for the arguments
interface AddUserArgs {
  input:{
    username: string;
    password: string;
  }
}

interface LoginUserArgs {
  username: string;
  password: string;
}

interface UserArgs {
  username: string;
}

interface SnippetArgs {
  snippetId: string;
}

interface SnippetsArgs {
  limit: number;
  search: string;
}

interface AddSnippetArgs {
  input:{
    text: string;
    author: string;
  }
}


const resolvers = {
  Query: {
    //returns all users
    users: async () => {
      return User.find().populate('snippets');
    },
    //returns a single user
    user: async (_parent: any, { username }: UserArgs) => {
      return User.findOne({ username }).populate('snippets');
    },
    //returns all snippets
    snippets: async (_parent: any, { limit, search }: SnippetsArgs) => {
      if (limit && search){
        const regExSearch = new RegExp(search, 'i')
        return await Snippet.find().or([{ language: regExSearch }, {title: regExSearch}, {author: regExSearch}]).sort({ createdAt: -1 }).limit(limit)
      }
      else if (limit){
        return await Snippet.find().sort({ createdAt: -1 }).limit(limit)
      }
      else if (search){
        const regExSearch = new RegExp(search, 'i')
        return await Snippet.find().or([{ language: regExSearch }, {title: regExSearch}, {author: regExSearch}]).sort({ createdAt: -1 }).limit(10)
      }
      else {
        return await Snippet.find().sort({ createdAt: -1 }).limit(10);
      }
    },
    //returns a single snippet
    snippet: async (_parent: any, { snippetId }: SnippetArgs) => {
      return await Snippet.findOne({ _id: snippetId });
    },
    // Query to get the authenticated user's information
    // The 'me' query relies on the context to check if the user is authenticated
    me: async (_parent: any, _args: any, context: any) => {
      // If the user is authenticated, find and return the user's information along with their snippets
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('snippets');
      }
      // If the user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError('Could not authenticate user.');
    },
  },
  Mutation: {
    // creates a new user
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      try {
        const user = await User.create({ ...input });
        const token = signToken(user.username, user._id);
        return { token, user };
      } catch (error: any) {
        console.error(error.message)
        return error
      }
      
    },
    
    // logs a user and returns a JWT
    login: async (_parent: any, { username, password }: LoginUserArgs) => {
      // Find a user with the provided email
      const user = await User.findOne({ username });
    
      // If no user is found, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);
    
      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Sign a token with the user's information
      const token = signToken(user.username, user._id);
    
      // Return the token and the user
      return { token, user };
    },

    // creates a new snippet
    addSnippet: async (_parent: any, { input }: AddSnippetArgs, context: any) => {
      if (context.user) {
        const openAIResponse = await explainCode(input.text)
        const author = context.user.username
        if (openAIResponse.formattedResponse.functional === "TRUE") {
          const snippet = await Snippet.create({ ...input, author, ...openAIResponse.formattedResponse });
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { snippets: snippet._id } }
          );
          return snippet;
        }
        else {
          const snippet = new Snippet({...input, ...openAIResponse.formattedResponse});
          return snippet;
        }
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },

    // deletes a snippet and updates a user
    removeSnippet: async (_parent: any, { snippetId }: SnippetArgs, context: any) => {
      console.log('Remove snippet method:')
      if (context.user) {
        console.log('User Exists!!')
        const snippet = await Snippet.findOneAndDelete({
          _id: snippetId,
        });
        console.log('Snippet deleted!')

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { snippets: snippet!._id } }
        );
        console.log('User updated!')

        return snippet;
      }
      throw AuthenticationError;
    }
  }
};

export default resolvers;

