import React from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	ScrollView,
	TextInput,
} from 'react-native';

import {
	CommentCard,
	CommentsPostActions,
	CommentsPostOwner,
	CommentTextInput,
	PostText,
	RecentLikes,
} from '../../components';
import { WallPostMedia } from '../../components/displayers/WallPostCard';
import {
	IMediaProps,
	IPostForComment,
	IResizeProps,
	ITranslatedProps,
	IWallPostComment,
} from '../../types';

import styles from './CommentsScreen.style';

const onStartCommentHandler = (commentInputRef: React.RefObject<TextInput>) => {
	if (commentInputRef.current) {
		commentInputRef.current.focus();
	}
};

const onCommentSendHandler = (
	commentInputRef: React.RefObject<TextInput>,
	onCommentSend: () => void,
) => {
	if (commentInputRef.current) {
		commentInputRef.current.blur();
	}
	onCommentSend();
};

interface ICommentsScreenComponentProps extends ITranslatedProps, IResizeProps {
	post: IPostForComment;
	comments: IWallPostComment[];
	onCommentLike: (comment: IWallPostComment) => void;
	onCommentSend: () => void;
	onCommentInputChange: (commentText: string) => void;
	startComment: boolean;
	onViewUserProfile: (userId: string) => void;
	comment: string;
	onShowOptionsMenu: (comment: IWallPostComment) => void;
	onCommentsBackPress: () => void;
	onImagePress: (index: number, medias: IMediaProps[]) => void;
	onLikePress: (likedByMe: boolean, postId: string) => void;
	optionsProps: object;
	likePostError: boolean;
	likeCommentError: boolean;
}

export const CommentsScreenView: React.SFC<ICommentsScreenComponentProps> = ({
	post,
	comments,
	onCommentLike,
	onCommentSend,
	startComment,
	onViewUserProfile,
	comment,
	onCommentInputChange,
	onShowOptionsMenu,
	onCommentsBackPress,
	onImagePress,
	onLikePress,
	optionsProps,
	likePostError,
	likeCommentError,
	marginBottom,
	getText,
}) => {
	const { postId, likes, media, postText, timestamp, owner, likedByMe } = post;

	const scrollRef: React.RefObject<ScrollView> = React.createRef();
	const commentInputRef: React.RefObject<TextInput> = React.createRef();

	return (
		<SafeAreaView
			style={[styles.container, Platform.select({ ios: { marginBottom } })]}
		>
			<CommentsPostOwner
				owner={owner}
				timestamp={timestamp}
				onBackPress={onCommentsBackPress}
				optionsProps={optionsProps}
				showUserProfile={onViewUserProfile}
				getText={getText}
			/>
			<ScrollView
				style={styles.commentsList}
				keyboardShouldPersistTaps="handled"
				ref={scrollRef}
				onLayout={() => scrollRef.current && scrollRef.current.scrollToEnd()}
			>
				<PostText
					text={postText}
					fullTextVisible={true}
					toggleShowFullText={() => undefined}
					handleHashTag={() => undefined}
					handleUserTag={() => undefined}
					launchExternalUrl={() => undefined}
					getText={getText}
				/>
				{media && (
					<WallPostMedia
						mediaObjects={media}
						onMediaObjectView={(index: number) => onImagePress(index, media)}
						onLikeButtonPressed={() => undefined}
						// onLikeButtonPressed={this.onDoubleTapLikeHandler}
						noInteraction={false}
						getText={getText}
					/>
				)}
				<RecentLikes
					likes={likes}
					onUserPress={onViewUserProfile}
					getText={getText}
				/>
				<CommentsPostActions
					likedByMe={likedByMe}
					likePostError={likePostError}
					onLikePress={() => onLikePress(likedByMe, postId)}
					onStartComment={() => onStartCommentHandler(commentInputRef)}
					getText={getText}
				/>

				{comments.length > 0 &&
					comments.map((comm) => (
						<CommentCard
							key={comm.commentId}
							comment={comm}
							onCommentLike={() => onCommentLike(comm)}
							onViewUserProfile={onViewUserProfile}
							onShowOptionsMenu={() => onShowOptionsMenu(comm)}
							likeCommentError={likeCommentError}
							getText={getText}
						/>
					))}
			</ScrollView>
			<KeyboardAvoidingView behavior="padding">
				<CommentTextInput
					ref={commentInputRef}
					autoFocus={startComment}
					onCommentSend={() =>
						onCommentSendHandler(commentInputRef, onCommentSend)
					}
					comment={comment}
					onCommentInputChange={onCommentInputChange}
					getText={getText}
				/>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};
