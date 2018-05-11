export default {
  Query: {
    user(obj, args, context) {
      const { user } = context;

      console.log('user in context', user);
      return user;
    },
    async todos() {
      return {};
    }
  },
  Mutation: {
    async login() {
      return {};
    }
  }
};
