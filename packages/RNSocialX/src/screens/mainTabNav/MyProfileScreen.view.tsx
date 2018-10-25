import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { DataProvider } from 'recyclerlistview';

import {
	DotsMenuButton,
	Header,
	IconButton,
	NoContent,
	ProfilePhotoGrid,
	ProfileTopContainer,
} from '../../components';
import { ITranslatedProps } from '../../types';

import styles, { icons } from './MyProfileScreen.style';

interface IMyProfileScreenViewProps extends ITranslatedProps {
	avatarURL: string;
	fullName: string;
	userName: false | string;
	numberOfPhotos: number;
	numberOfLikes: number;
	numberOfFriends: number;
	numberOfComments: number;
	onViewProfilePhoto: () => void;
	aboutMeText: false | string;
	dataProvider: DataProvider;
	loadMorePhotosHandler: () => void;
	onViewMediaFullScreen: (index: number) => void;
	onEditProfile: () => void;
	onSharePress: () => void;
	onShowDotsModal: () => void;
	hasPhotos: boolean;
}

export const MyProfileScreenView: React.SFC<IMyProfileScreenViewProps> = ({
	avatarURL,
	fullName,
	userName,
	numberOfPhotos,
	numberOfLikes,
	numberOfFriends,
	numberOfComments,
	aboutMeText,
	loadMorePhotosHandler,
	dataProvider,
	onViewMediaFullScreen,
	onViewProfilePhoto,
	hasPhotos,
	onEditProfile,
	onSharePress,
	onShowDotsModal,
	getText,
}) => {
	const scrollContainerStyles = hasPhotos
		? styles.scrollContainer
		: [styles.scrollContainer, { flex: 1 }];

	return (
		<View style={styles.container}>
			<Header
				title={getText('my.profile.screen.title')}
				left={
					<IconButton
						iconSource={icons.shareIconWhite}
						iconType="image"
						iconStyle={styles.icon}
						onPress={onSharePress}
					/>
				}
				right={<DotsMenuButton onPress={onShowDotsModal} />}
			/>
			<View style={styles.whiteBottomView} />
			<ScrollView
				contentContainerStyle={scrollContainerStyles}
				showsVerticalScrollIndicator={false}
				scrollEnabled={hasPhotos}
			>
				<ProfileTopContainer
					avatarURL={avatarURL}
					fullName={fullName}
					userName={userName}
					numberOfFriends={numberOfFriends}
					numberOfLikes={numberOfLikes}
					numberOfPhotos={numberOfPhotos}
					numberOfComments={numberOfComments}
					onViewProfilePhoto={onViewProfilePhoto}
					isCurrentUser={true}
					aboutMeText={aboutMeText}
					onEditProfile={onEditProfile}
					getText={getText}
					onAddFriend={() => {
						/**/
					}}
				/>
				{hasPhotos ? (
					<View style={styles.gridContainer}>
						<ProfilePhotoGrid
							loadMorePhotosHandler={loadMorePhotosHandler}
							dataProvider={dataProvider}
							onViewMediaFullScreen={onViewMediaFullScreen}
							header={{
								element: <View style={{ width: 1, height: 1 }} />,
								height: 1,
							}}
							disabled={hasPhotos}
							getText={getText}
						/>
					</View>
				) : (
					<NoContent gallery={true} owner={true} getText={getText} />
				)}
			</ScrollView>
		</View>
	);
};
