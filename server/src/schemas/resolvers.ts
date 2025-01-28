// import { signToken, AuthenticationError } from '../utils/auth.js';


const resolvers = {
  Query: {
    // EXAMPLE
    //
    // profiles: async (): Promise<Profile[]> => {
    //   return await Profile.find();
    // }
  },
  Mutation: {
    // EXAMPLE
    // 
    // addProfile: async (_parent: any, { input }: AddProfileArgs): Promise<{ token: string; profile: Profile }> => {
    //   const profile = await Profile.create({ ...input });
    //   const token = signToken(profile.name, profile.email, profile._id);
    //   return { token, profile };
    // }
  }
};

export default resolvers;
