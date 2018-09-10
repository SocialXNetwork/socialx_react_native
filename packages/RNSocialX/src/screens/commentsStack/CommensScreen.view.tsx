/**
 * TODO list:
 * 1. revisit requestingLike prop on CommentCard, which now has a hardcoded value
 */

import React, {RefObject} from 'react';
import {Platform, SafeAreaView, ScrollView} from 'react-native';

import {CommentCard, CommentTextInput} from '../../components';
import {WallPostMedia} from '../../components/displayers/WallPostCard';
import {IWithLoaderProps, WithInlineLoader} from '../../components/inlineLoader';
import {IMediaProps, IResizeProps, ITranslatedProps, IWallPostComment} from '../../types';
import style from './CommensScreen.style';
import {NoComments, PostActions, PostLikes, PostOwner, PostText} from './components';

const scrollRef: RefObject<ScrollView> = React.createRef();

interface ICommentsScreenComponentProps extends IWithLoaderProps, ITranslatedProps, IResizeProps {
	comments: IWallPostComment[];
	onCommentLike: (comment: IWallPostComment) => void;
	onCommentReply: (comment: IWallPostComment, startReply: boolean) => void;
	onCommentSend: () => void;
	onCommentTextChange: (commentText: string) => void;
	startComment: boolean;
	onViewUserProfile: (userId: string) => void;
	commentText: string;
	showSendButton: boolean;
	noCommentsText: string;
	commentInputPlaceholder: string;
	onShowOptionsMenu: (comment: IWallPostComment) => void;
	postData: any;
	postOwner: object;
	onCommentsBackPress: () => void;
	onImagePress: (index: any, medias: IMediaProps[]) => void;
	onLikePress: (likedByMe: boolean, postId: string) => Promise<any>;
	currentUser: any;
	onCommentContainerWidthChange: (value: number) => void;
	commentLikesPosition: object;
	optionsProps: object;
}

export const CommentsScreenView: React.SFC<ICommentsScreenComponentProps> = ({
	comments,
	onCommentLike,
	onCommentReply,
	onCommentSend,
	startComment,
	onViewUserProfile,
	commentText,
	showSendButton,
	onCommentTextChange,
	noCommentsText,
	commentInputPlaceholder,
	onShowOptionsMenu,
	postData,
	postOwner,
	onCommentsBackPress,
	onImagePress,
	onLikePress,
	currentUser,
	getText,
	onCommentContainerWidthChange,
	commentLikesPosition,
	optionsProps,
	isLoading,
	marginBottom,
}) => {
	const {id, likes, media, text, timestamp} = postData;
	const likedByMe = !!likes.find((like: any) => like.userId === currentUser.userId);

	return (
		<SafeAreaView style={[style.container, Platform.select({ios: {marginBottom}})]}>
			<WithInlineLoader isLoading={isLoading}>
				<ScrollView
					style={style.commentsList}
					keyboardShouldPersistTaps={'handled'}
					ref={scrollRef}
					onLayout={() => scrollRef.current && scrollRef.current.scrollToEnd()}
				>
					<PostOwner
						owner={postOwner}
						timestamp={timestamp}
						onBackPress={onCommentsBackPress}
						optionsProps={optionsProps}
						getText={getText}
						showUserProfile={onViewUserProfile}
					/>
					{text ? <PostText text={text} /> : null}
					{media && (
						<WallPostMedia
							mediaObjects={media}
							onMediaObjectView={(index: number) => onImagePress(index, media)}
							// onLikeButtonPressed={this.onDoubleTapLikeHandler}
							noInteraction={false}
						/>
					)}
					<PostLikes getText={getText} likes={likes} showUserProfile={onViewUserProfile} />
					<PostActions likedByMe={likedByMe} onLikePress={() => onLikePress(likedByMe, id)} getText={getText} />
					{comments.length === 0 ? (
						<NoComments text={noCommentsText} />
					) : (
						comments.map((comment) => (
							<CommentCard
								key={comment.id}
								comment={comment}
								onCommentLike={() => onCommentLike(comment)}
								onCommentReply={(startReply: boolean) => onCommentReply(comment, startReply)}
								onViewUserProfile={onViewUserProfile}
								requestingLike={false}
								onShowOptionsMenu={() => onShowOptionsMenu(comment)}
								onCommentContainerWidthChange={(width: number) => onCommentContainerWidthChange(width)}
								commentLikesPosition={commentLikesPosition}
								getText={getText}
							/>
						))
					)}
				</ScrollView>
				<CommentTextInput
					autoFocus={startComment}
					onCommentSend={onCommentSend}
					placeholder={commentInputPlaceholder}
					showSendButton={showSendButton}
					commentText={commentText}
					onCommentTextChange={onCommentTextChange}
				/>
			</WithInlineLoader>
		</SafeAreaView>
	);
};
