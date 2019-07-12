import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';

const myPostsQuery = (props: string) => gql`
    {
        myPosts {
            ${props}
        }
    }
`;

const postQuery = (props: string) => gql`
    query post($postId: ID!){
        post(postId: $postId) {
            ${props}
        }
    }
`;

const sortedPostsQuery = (props: string) => gql`
    query sortedPosts($args: SortedPostsInput!) {
        sortedPosts(args: $args) {
            ${props}
        }
    }
`;

export const useMyPosts = (properties: string) =>
	useQuery<{ myPosts: IGraphqlTypes.IPost[] }>(myPostsQuery(properties));

export const usePost = (properties: string, postId: string) =>
	useQuery<{ post: IGraphqlTypes.IPost }, IGraphqlTypes.IPostOnQueryArguments>(
		postQuery(properties),
		{ variables: { postId } },
	);

export const useSortedPosts = (properties: string, args: IGraphqlTypes.ISortedPostsInput) =>
	useQuery<{ sortedPosts: IGraphqlTypes.IPost[] }, IGraphqlTypes.ISortedPostsOnQueryArguments>(
		sortedPostsQuery(properties),
		{ variables: { args } },
	);
