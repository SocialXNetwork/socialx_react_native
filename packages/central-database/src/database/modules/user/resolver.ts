export default {
    Query: {
        currentUser: async (_, __, { User, authHeader }) => {
            const currentUserId = await decodeAuthHeader(authHeader);
            if (!currentUserId) {
                throw new Error('User not logged in.');
            }
            
            const user = await User.findById(currentUserId);
            return user;
        }
    },
}