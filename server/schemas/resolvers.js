const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

// Query db
const resolvers={
    Query:{
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                   .select('-__v -password')
                   .populate('books');
                return userData;
            }
            throw new AuthenticationError('Please log in!');
        }
    },
    Mutation:{
        // Mutation for the login authentication
        login: async (parent, {email,password})=> {
            const user = await User.findOne({ email});
            if (!user) {
                throw new AuthenticationError('Incorrect email or password');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect email or password');
            }
            const token = signToken(user);
            return { token, user };
        },
        // Mutation to add user
        addUser: async(parent, args)=>{
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        // Mutation to save a book
        saveBook: async(parent  , {bookData},context)=> {
            if (context.user){
                const updateUser= await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: {savedBooks:bookData}},
                    {new: true, runValidators: true}
                );
                return updateUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        // Mutation to remove a book
        removeBook: async(parent, {bookId},context)=> {
            if (context.user){
                const updateUser= await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedBooks:bookId}},
                    {new: true, runValidators: true}
                );
                return updateUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
};

module.exports = resolvers;
