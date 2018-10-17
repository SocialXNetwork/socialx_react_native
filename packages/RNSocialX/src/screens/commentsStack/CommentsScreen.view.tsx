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
	CommentsPostLikes,
	CommentsPostOwner,
	CommentsPostText,
	CommentTextInput,
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
	onCommentLike: (comment: IWallPostComment) => void;
	onCommentReply: (comment: IWallPostComment, startReply: boolean) => void;
	onCommentSend: () => void;
	onCommentTextChange: (commentText: string) => void;
	startComment: boolean;
	onViewUserProfile: (userId: string) => void;
	comment: string;
	onShowOptionsMenu: (comment: IWallPostComment) => void;
	onCommentsBackPress: () => void;
	onImagePress: (index: number, medias: IMediaProps[]) => void;
	onLikePress: (likedByMe: boolean, postId: string) => void;
	onCommentContainerWidthChange: (value: number) => void;
	commentLikesPosition: object;
	optionsProps: object;
}

export const CommentsScreenView: React.SFC<ICommentsScreenComponentProps> = ({
	post,
	onCommentLike,
	onCommentReply,
	onCommentSend,
	startComment,
	onViewUserProfile,
	comment,
	onCommentTextChange,
	onShowOptionsMenu,
	onCommentsBackPress,
	onImagePress,
	onLikePress,
	getText,
	onCommentContainerWidthChange,
	commentLikesPosition,
	optionsProps,
	marginBottom,
}) => {
	const {
		id,
		likes,
		media,
		postText,
		timestamp,
		owner,
		comments,
		likedByMe,
	} = post;

	const scrollRef: React.RefObject<ScrollView> = React.createRef();
	const commentInputRef: React.RefObject<TextInput> = React.createRef();

	return (
		<SafeAreaView
			style={[styles.container, Platform.select({ ios: { marginBottom } })]}
		>
			<ScrollView
				style={styles.commentsList}
				keyboardShouldPersistTaps="handled"
				ref={scrollRef}
				onLayout={() => scrollRef.current && scrollRef.current.scrollToEnd()}
			>
				<CommentsPostOwner
					owner={owner}
					timestamp={timestamp}
					onBackPress={onCommentsBackPress}
					optionsProps={optionsProps}
					getText={getText}
					showUserProfile={onViewUserProfile}
				/>
				<CommentsPostText text={postText} />
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
				<CommentsPostLikes
					getText={getText}
					likes={likes}
					showUserProfile={onViewUserProfile}
				/>
				<CommentsPostActions
					likedByMe={likedByMe}
					onLikePress={() => onLikePress(likedByMe, id)}
					getText={getText}
					onStartComment={() => onStartCommentHandler(commentInputRef)}
				/>
				{comments.length > 0 &&
					comments.map((comm) => (
						<CommentCard
							key={comm.id}
							comment={comm}
							onCommentLike={() => onCommentLike(comm)}
							onCommentReply={(startReply: boolean) =>
								onCommentReply(comm, startReply)
							}
							onViewUserProfile={onViewUserProfile}
							onShowOptionsMenu={() => onShowOptionsMenu(comm)}
							onCommentContainerWidthChange={(width: number) =>
								onCommentContainerWidthChange(width)
							}
							commentLikesPosition={commentLikesPosition}
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
					placeholder={getText('comments.screen.comment.input.placeholder')}
					commentText={comment}
					onCommentTextChange={onCommentTextChange}
				/>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};
