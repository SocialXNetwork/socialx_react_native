import * as React from 'react';
import {
	Animated,
	FlatList,
	LayoutChangeEvent,
	NativeScrollEvent,
	NativeSyntheticEvent,
	Platform,
	RefreshControl,
	ScrollView,
	View,
} from 'react-native';
import { AnimatedValue } from 'react-navigation';
import { DataProvider } from 'recyclerlistview';

import {
	Header,
	MediaOverlay,
	NoContent,
	Profile,
	ProfilePhotoGrid,
	WallPost,
} from '../../components';
import { OS_TYPES, PROFILE_TAB_ICON_TYPES } from '../../environment/consts';
import { IDictionary, INavigationProps, IVisitedUser } from '../../types';

import { Colors } from '../../environment/theme';
import styles from './UserProfileScreen.style';

interface IUserProfileScreenViewProps extends INavigationProps, IDictionary {
	visitedUser: IVisitedUser;
	hasFriends: boolean;
	loadingProfile: boolean;
	dataProvider: DataProvider;
	listTranslate: AnimatedValue;
	gridTranslate: AnimatedValue;
	activeTab: string;
	containerHeight: number;
	onRefresh: () => void;
	onGoBack: () => void;
	onProfilePhotoPress: () => void;
	onLoadMorePhotos: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
	onViewMedia: (index: number) => void;
	onIconPress: (tab: string) => void;
	onLayoutChange: (height: number) => void;
	onViewFriends: (alias: string) => void;
}

export const UserProfileScreenView: React.SFC<IUserProfileScreenViewProps> = ({
	visitedUser,
	hasFriends,
	loadingProfile,
	dataProvider,
	listTranslate,
	gridTranslate,
	activeTab,
	containerHeight,
	onRefresh,
	onProfilePhotoPress,
	onViewMedia,
	onLoadMorePhotos,
	onIconPress,
	onLayoutChange,
	onViewFriends,
	onGoBack,
	navigation,
	dictionary,
}) => {
	const {
		alias,
		postIds,
		numberOfLikes,
		numberOfPhotos,
		numberOfFriends,
		numberOfComments,
		avatar,
		fullName,
		description,
		status,
	} = visitedUser;

	const hasPhotos = numberOfPhotos > 0;
	const hasPosts = postIds.length > 0;

	const contentContainerStyle =
		activeTab === PROFILE_TAB_ICON_TYPES.GRID && containerHeight !== 0
			? [styles.contentContainer, { height: containerHeight }]
			: styles.contentContainer;

	const scrollContainerStyles =
		hasPhotos || hasPosts ? styles.scrollContainer : [styles.scrollContainer, { flexGrow: 1 }];

	return (
		<View style={styles.container}>
			<MediaOverlay navigation={navigation} />
			<View style={styles.headerContainer}>
				<Header title={dictionary.screens.userProfile.title} back={true} onPressBack={onGoBack} />
			</View>
			<ScrollView
				contentContainerStyle={scrollContainerStyles}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={loadingProfile}
						onRefresh={onRefresh}
						tintColor={Colors.white}
						progressBackgroundColor={Colors.white}
					/>
				}
				scrollEnabled={!loadingProfile}
				scrollEventThrottle={100}
				onScroll={onLoadMorePhotos}
			>
				<Profile
					alias={alias}
					avatar={avatar}
					fullName={fullName}
					description={description}
					status={status}
					numberOfFriends={numberOfFriends}
					numberOfLikes={numberOfLikes}
					numberOfPhotos={numberOfPhotos}
					numberOfComments={numberOfComments}
					isCurrentUser={false}
					activeTab={activeTab}
					tabs={hasPosts}
					friends={hasFriends}
					onProfilePhotoPress={onProfilePhotoPress}
					onIconPress={onIconPress}
					onViewFriends={onViewFriends}
					dictionary={dictionary}
				/>
				<View style={contentContainerStyle}>
					<Animated.View
						style={[styles.postsContainer, { transform: [{ translateX: listTranslate }] }]}
					>
						<FlatList
							windowSize={10}
							data={postIds}
							keyExtractor={(id) => id}
							renderItem={(data) => (
								<View style={styles.post}>
									<WallPost postId={data.item} commentInput={false} navigation={navigation} />
								</View>
							)}
							scrollEnabled={false}
							showsVerticalScrollIndicator={false}
							ListEmptyComponent={<NoContent posts={true} dictionary={dictionary} />}
						/>

						{Platform.OS === OS_TYPES.IOS && <View style={styles.spacer} />}
					</Animated.View>
					<Animated.View
						onLayout={(event: LayoutChangeEvent) => {
							if (containerHeight !== event.nativeEvent.layout.height) {
								onLayoutChange(event.nativeEvent.layout.height);
							}
						}}
						style={[styles.gridContainer, { transform: [{ translateX: gridTranslate }] }]}
					>
						{hasPhotos ? (
							<View style={{ flex: 1 }}>
								<ProfilePhotoGrid
									dataProvider={dataProvider}
									scrollEnabled={false}
									onViewMedia={onViewMedia}
								/>
								{Platform.OS === OS_TYPES.IOS && <View style={styles.spacer} />}
							</View>
						) : (
							<React.Fragment>
								<NoContent gallery={true} dictionary={dictionary} />
								{Platform.OS === OS_TYPES.IOS && <View style={styles.spacer} />}
							</React.Fragment>
						)}
					</Animated.View>
				</View>
			</ScrollView>
		</View>
	);
};
