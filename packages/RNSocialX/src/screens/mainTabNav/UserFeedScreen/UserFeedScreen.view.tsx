import * as React from 'react';
import { Dimensions, FlatList, Platform, RefreshControl, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { FeedWithNoPosts, LoadingFooter, ShareSection, WallPost } from '../../../components';
import { OS_TYPES } from '../../../environment/consts';
import { INavigationProps, ITranslatedProps } from '../../../types';

import styles from './UserFeedScreen.style';

interface IUserFeedScreenViewProps extends INavigationProps, ITranslatedProps {
	avatar: string;
	postIds: string[];
	placeholderPostId: string | null;
	refreshing: boolean;
	shareMessage: string;
	loadingMorePosts: boolean;
	canLoadMorePosts: boolean;
	onRefresh: () => void;
	onLoadMorePosts: () => void;
	onCreateWallPost: () => void;
}

export class UserFeedScreenView extends React.Component<IUserFeedScreenViewProps> {
	public render() {
		const {
			postIds,
			avatar,
			refreshing,
			canLoadMorePosts,
			shareMessage,
			placeholderPostId,
			onRefresh,
			onLoadMorePosts,
			onCreateWallPost,
			getText,
		} = this.props;

		const data = placeholderPostId ? [placeholderPostId, ...postIds] : postIds;
		const isPhoneXOrAbove = Platform.OS === OS_TYPES.IOS && Dimensions.get('screen').height > 800;
		const scrollOffset = Platform.OS === OS_TYPES.Android ? -30 : isPhoneXOrAbove ? 70 : 50;

		return (
			<KeyboardAwareScrollView
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				alwaysBounceVertical={false}
				keyboardShouldPersistTaps="handled"
				enableOnAndroid={true}
				enableResetScrollToCoords={false}
				extraScrollHeight={scrollOffset}
				style={styles.container}
			>
				<View style={styles.container}>
					<FlatList
						windowSize={10}
						data={data}
						keyboardShouldPersistTaps="handled"
						keyExtractor={(id) => id}
						renderItem={this.renderItem}
						onEndReached={canLoadMorePosts ? onLoadMorePosts : null}
						onEndReachedThreshold={2}
						ListHeaderComponent={
							<ShareSection
								avatar={avatar}
								message={shareMessage}
								onCreateWallPost={onCreateWallPost}
							/>
						}
						ListFooterComponent={<LoadingFooter hasMore={canLoadMorePosts} />}
						ListEmptyComponent={
							<FeedWithNoPosts onCreateWallPost={onCreateWallPost} getText={getText} />
						}
						showsVerticalScrollIndicator={false}
					/>
				</View>
			</KeyboardAwareScrollView>
		);
	}

	private renderItem = (data: { item: string; index: number }) => (
		<View style={styles.post}>
			<WallPost postId={data.item} commentInput={true} navigation={this.props.navigation} />
		</View>
	);
}
