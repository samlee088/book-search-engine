const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User } = require('../models');


const resolvers = {

    Query: {
        users: async(parent, { username }) => {
            return User.findOne({ username });
        },
        me: async(parent, { context }) => {
            if( context.user) {
                return User.findOne({ _id: context.user._id});
            }
            throw new AuthenticationError('You need to be logged in!');
        },

    },

    Mutation: {
        addUser: async(parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user};
        },
        login: async(parent, { email, password }) => {
            const user = await User.findOne({ email });

            if(!user) {
                throw new AuthenticationError('No user found with this email address');
            } 

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('The password you entered is invalid. Please check your password and try again.')
            }

            const token = signToken(user);

            return ( token, user )
        },
        saveBook: async(parent, bookInfo , context) => {
            if (context.user) {
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: bookInfo } }
                );
           }
           throw new AuthenticationError('You need to be logged in!');
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: bookInfo } }
                )
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    }
}


module.exports = resolvers;