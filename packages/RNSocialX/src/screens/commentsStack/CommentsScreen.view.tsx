import React from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	ScrollView,
	TextInput,
	View,
} from 'react-native';

import {
	CommentCard,
	CommentsPostActions,
	CommentsPostOwner,
	CommentTextInput,
	PostText,
	RecentLikes,
} from '../../components';
import { WallPostMedia } from '../../components/displayers/WallPost';
import {
	IMediaProps,
	IOptionsMenuItem,
	IPostForComment,
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
		commentInputRef.current.clear();
	}
	onCommentSend();
};

interface ICommentsScreenComponentProps extends ITranslatedProps {
	post: IPostForComment;
	comments: IWallPostComment[];
	onCommentLike: (comment: IWallPostComment) => void;
	onCommentSend: () => void;
	onCommentInputChange: (commentText: string) => void;
	startComment: boolean;
	onViewUserProfile: (userId: string) => void;
	comment: string;
	onShowCommentsOptionsMenu: (comment: IWallPostComment) => void;
	onShowPostOptionsMenu: () => void;
	onCommentsBackPress: () => void;
	onImagePress: (index: number, medias: IMediaProps[]) => void;
	onLikePress: (likedByMe: boolean, postId: string) => void;
	likePostError: boolean;
	likeCommentError: boolean;
	showOptionsMenu: (items: IOptionsMenuItem[]) => void;
	recentLikes: {
		first: string | null;
		second: string | null;
		total: number;
	};
	scrollRef: React.RefObject<ScrollView>;
	commentInputRef: React.RefObject<TextInput>;
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
	onShowCommentsOptionsMenu,
	onShowPostOptionsMenu,
	onCommentsBackPress,
	onImagePress,
	onLikePress,
	likePostError,
	likeCommentError,
	recentLikes,
	scrollRef,
	commentInputRef,
	getText,
}) => {
	const { postId, media, postText, timestamp, owner, likedByMe } = post;

	return (
		<SafeAreaView style={styles.container}>
			<CommentsPostOwner
				owner={owner}
				timestamp={timestamp}
				onBackPress={onCommentsBackPress}
				showUserProfile={onViewUserProfile}
				onShowPostOptionsMenu={onShowPostOptionsMenu}
			/>
			<ScrollView
				style={{ flex: 1 }}
				ref={scrollRef}
				onLayout={() => scrollRef.current && scrollRef.current.scrollToEnd()}
				onContentSizeChange={() => scrollRef.current && scrollRef.current.scrollToEnd()}
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
					<View style={styles.media}>
						<WallPostMedia
							mediaObjects={media}
							onMediaObjectView={(index: number) => onImagePress(index, media)}
							onLikeButtonPressed={() => undefined}
							// onLikeButtonPressed={this.onDoubleTapLikeHandler}
							noInteraction={false}
							getText={getText}
						/>
					</View>
				)}
				<CommentsPostActions
					likedByMe={likedByMe}
					likePostError={likePostError}
					onLikePress={() => onLikePress(likedByMe, postId)}
					onStartComment={() => onStartCommentHandler(commentInputRef)}
					getText={getText}
				/>
				<RecentLikes recentLikes={recentLikes} onUserPress={onViewUserProfile} getText={getText} />
				{comments.length > 0 &&
					comments.map((comm) => (
						<CommentCard
							key={comm.commentId}
							comment={comm}
							onCommentLike={() => onCommentLike(comm)}
							onViewUserProfile={onViewUserProfile}
							onShowOptionsMenu={() => onShowCommentsOptionsMenu(comm)}
							likeCommentError={likeCommentError}
							getText={getText}
						/>
					))}
			</ScrollView>
			<KeyboardAvoidingView behavior="padding">
				<CommentTextInput
					ref={commentInputRef}
					autoFocus={startComment}
					onCommentSend={() => onCommentSendHandler(commentInputRef, onCommentSend)}
					comment={comment}
					onCommentInputChange={onCommentInputChange}
					getText={getText}
				/>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};
