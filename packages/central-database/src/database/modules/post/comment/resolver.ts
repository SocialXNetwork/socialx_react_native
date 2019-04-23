export default {
    Query: {
        myComments: async (_, __, { User, authHeader }) => {
            const currentUserId = await decodeAuthHeader(authHeader);
            if (!currentUserId) {
                throw new Error('User not logged in.');
            }
            
            const user = await User.findById(currentUserId);
            return user.comments;
        },
        comment: async (_, { commentId }, { Comment, authHeader }) => {
            const currentUserId = await decodeAuthHeader(authHeader);
            if (!currentUserId) {
                throw new Error('User not logged in.');
            }
            
            const comment = await Comment.findById(commentId);
            if (!comment) {
                throw new Error(`Comment with id ${commentId} was not found!`);
            }
            return comment;
        }
    },
}