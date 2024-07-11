const { User } = require("../models")
const { GraphQLError } = require('graphql')
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        me: async (root, args, context) => {
            if (!context.currentUser) {
                throw new GraphQLError("not authenticated", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                    },
                })
            }
            return context.currentUser
        }
    },
    Mutation: {
        loginUser: async (root, args) => {
            const { email, password } = args
            const user = await User.findOne({ $or: [{ email }] });
            if (!user) {
                throw new GraphQLError("Not found", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                    },
                })
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                return null
            }
            const token = signToken(user);
            return { token }
        },
        addUser: async (root, args) => {
            const user = await User.create(args);

            if (!user) {
                throw new GraphQLError("Bad Input", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                    },
                })
            }
            const token = signToken(user);
            return { token, user };
        },
        removeBook: async (root, args, context) => {
            const { bookId } = args
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.currentUser._id },
                { $pull: { savedBooks: { bookId } } },
                { new: true }
            );
            if (!updatedUser) {
                throw new GraphQLError("Couldn't find user with this id!", {
                    extensions: {
                        code: "BAD_USER_INPUT",

                    },
                })
            }
            return updatedUser;
        },
        saveBook: async (root, args, context) => {
            const { currentUser } = context
            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: currentUser._id },
                    { $addToSet: { savedBooks: args } },
                    { new: true, runValidators: true }
                );
                return updatedUser
            } catch (err) {
                console.error(err)
                throw new GraphQLError("Bad input", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                    },
                    originalError: err
                })
            }
        }
    }
}
module.exports = resolvers