import * as React from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import {DataProvider} from 'recyclerlistview';

import {NoPhotos, ProfilePhotoGrid, ProfileTopContainer} from '../../components';
import {IWithLoaderProps, WithInlineLoader} from '../../components/inlineLoader';
import {ITranslatedProps} from '../../types';
import styles, {colors} from './MyProfileScreen.style';

interface IMyProfileScreenViewProps extends IWithLoaderProps, ITranslatedProps {
	avatarURL: any;
	fullName: string;
	userName: false | string;
	numberOfPhotos: number;
	numberOfLikes: number;
	numberOfFriends: number;
	numberOfViews: number;
	onViewProfilePhoto: () => void;
	aboutMeText: false | string;
	refreshing: boolean;
	gridMediaProvider: DataProvider;
	loadMorePhotosHandler: () => void;
	onRefresh: () => void;
	onViewMediaFullScreen: (index: number) => void;
	onEditProfile: () => void;
	hasPhotos: boolean;
}

export const MyProfileScreenView: React.SFC<IMyProfileScreenViewProps> = ({
	refreshing,
	onRefresh,
	avatarURL,
	fullName,
	userName,
	numberOfPhotos,
	numberOfLikes,
	numberOfFriends,
	numberOfViews,
	aboutMeText,
	loadMorePhotosHandler,
	gridMediaProvider,
	onViewMediaFullScreen,
	onViewProfilePhoto,
	hasPhotos,
	onEditProfile,
	isLoading,
	getText,
}) => {
	const scrollContainerStyles = hasPhotos ? styles.scrollContainer : [styles.scrollContainer, {flex: 1}];

	return (
		<WithInlineLoader isLoading={isLoading}>
			<View style={styles.container}>
				<View style={styles.whiteBottomView} />
				<ScrollView
					contentContainerStyle={scrollContainerStyles}
					showsVerticalScrollIndicator={false}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.white} />}
					scrollEnabled={hasPhotos}
				>
					{
						// @ts-ignore
						<ProfileTopContainer
							avatarURL={avatarURL}
							fullName={fullName}
							userName={userName}
							numberOfFriends={numberOfFriends}
							numberOfLikes={numberOfLikes}
							numberOfPhotos={numberOfPhotos}
							numberOfViews={numberOfViews}
							onViewProfilePhoto={onViewProfilePhoto}
							isCurrentUser={true}
							aboutMeText={aboutMeText}
							onEditProfile={onEditProfile}
							getText={getText}
						/>
					}
					{hasPhotos && (
						<View style={styles.gridContainer}>
							<ProfilePhotoGrid
								loadMorePhotosHandler={loadMorePhotosHandler}
								gridMediaProvider={gridMediaProvider}
								onViewMediaFullScreen={onViewMediaFullScreen}
								header={{
									element: <View style={{width: 1, height: 1}} />,
									height: 1,
								}}
								disabled={hasPhotos}
							/>
						</View>
					)}
					{!hasPhotos && <NoPhotos getText={getText} />}
				</ScrollView>
			</View>
		</WithInlineLoader>
	);
};
