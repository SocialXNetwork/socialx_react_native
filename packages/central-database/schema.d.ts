// tslint:disable
// graphql typescript definitions

declare namespace IGraphqlTypes {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: 'Query';
    myComments: Array<IComment | null> | null;
    comment: IComment | null;
    myLikes: Array<ILike | null> | null;
    like: ILike | null;
    myPosts: Array<IPost | null> | null;
    post: IPost | null;
    sortedPosts: ISortedPostsType | null;
    currentUser: IUser | null;
    currentUserFriends: Array<IUser | null> | null;
  }

  interface ICommentOnQueryArguments {
    commentId: string;
  }

  interface ILikeOnQueryArguments {
    likeId: string;
  }

  interface IPostOnQueryArguments {
    postId: string;
  }

  interface ISortedPostsOnQueryArguments {
    args?: ISortedPostsInput | null;
  }

  interface IComment {
    __typename: 'Comment';
    _id: string;
    createdAt: string;
    updatedAt: string;
    owner: IUser;
    text: string;
    type: CommentType;
    target: string;
    children: Array<string | null> | null;
    likes: Array<ILike | null> | null;
  }

  interface IUser {
    __typename: 'User';
    _id: string;
    createdAt: any;
    updatedAt: any;
    username: string;
    email: string;
    avatar: string;
    bio: string;
    phone: string;
    identity: IUserIdentification;
    token: string;
    posts: Array<IPost | null> | null;
    comments: Array<IComment | null> | null;
    likes: Array<ILike | null> | null;
    friends: Array<IUser | null> | null;
  }

  interface IUserIdentification {
    __typename: 'UserIdentification';
    pub: string;
    epub: string;
  }

  interface IPost {
    __typename: 'Post';
    _id: string;
    createdAt: string;
    updatedAt: string;
    owner: IUser;
    images: Array<string | null> | null;
    text: string;
    location: IPostLocation | null;
    tags: Array<IUser | null> | null;
    likes: Array<ILike | null> | null;
    comments: Array<IComment | null> | null;
  }

  interface IPostLocation {
    __typename: 'PostLocation';
    long: string | null;
    lat: string | null;
    meta: string | null;
  }

  interface ILike {
    __typename: 'Like';
    _id: string;
    createdAt: string;
    updatedAt: string;
    owner: IUser;
    type: LikeType;
    target: string;
  }

  const enum LikeType {
    Comment = 'Comment',
    Post = 'Post'
  }

  const enum CommentType {
    Post = 'Post',
    Comment = 'Comment'
  }

  interface ISortedPostsInput {
    order: SortOrder;
    token?: string | null;
    limit?: number | null;
  }

  const enum SortOrder {
    ASC = 'ASC',
    DES = 'DES'
  }

  interface ISortedPostsType {
    __typename: 'SortedPostsType';
    data: Array<IPost | null> | null;
    nextToken: string;
    canLoadMore: boolean;
  }

  interface IMutation {
    __typename: 'Mutation';
    createComment: IComment;
    createLike: ILike;
    removeLike: ILike;
    login: IUser | null;
    register: IUser;
    addFriend: IUser | null;
    removeFriend: IUser | null;
    acceptFriendRequest: boolean;
    declineFriendRequest: boolean;
  }

  interface ICreateCommentOnMutationArguments {
    args: ICreateCommentInput;
  }

  interface ICreateLikeOnMutationArguments {
    args: ICreateLikeInput;
  }

  interface IRemoveLikeOnMutationArguments {
    likeId: string;
  }

  interface ILoginOnMutationArguments {
    username: string;
    password: string;
  }

  interface IRegisterOnMutationArguments {
    args: IRegisterTypeInput;
  }

  interface IAddFriendOnMutationArguments {
    userId: string;
  }

  interface IRemoveFriendOnMutationArguments {
    userId: string;
  }

  interface IAcceptFriendRequestOnMutationArguments {
    requestId: string;
  }

  interface IDeclineFriendRequestOnMutationArguments {
    requestId: string;
  }

  interface ICreateCommentInput {
    type: CommentType;
    target: string;
    text: string;
  }

  interface ICreateLikeInput {
    type: LikeType;
    target: string;
  }

  interface IRegisterTypeInput {
    username: string;
    password: string;
    email: string;
    avatar?: string | null;
    bio?: string | null;
    phone?: string | null;
    pub: string;
    epub: string;
  }
}

// tslint:enable
