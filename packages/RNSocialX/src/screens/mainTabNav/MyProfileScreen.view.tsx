import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { DataProvider } from 'recyclerlistview';

import {
	Header,
	IconButton,
	NoContent,
	OptionsMenuButton,
	ProfilePhotoGrid,
	ProfileTopContainer,
} from '../../components';
import { ITranslatedProps } from '../../types';

import styles, { icons } from './MyProfileScreen.style';

interface IMyProfileScreenViewProps extends ITranslatedProps {
	avatar: string;
	fullName: string;
	userName: false | string;
	numberOfPhotos: number;
	numberOfLikes: number;
	numberOfFriends: number;
	numberOfComments: number;
	description: false | string;
	dataProvider: DataProvider;
	onProfilePhotoPress: () => void;
	onLoadMorePhotos: () => void;
	onViewMediaFullScreen: (index: number) => void;
	onEditProfile: () => void;
	onSharePress: () => void;
	onShowDotsModal: () => void;
	hasPhotos: boolean;
}

export const MyProfileScreenView: React.SFC<IMyProfileScreenViewProps> = ({
	avatar,
	fullName,
	userName,
	numberOfPhotos,
	numberOfLikes,
	numberOfFriends,
	numberOfComments,
	description,
	dataProvider,
	hasPhotos,
	onLoadMorePhotos,
	onViewMediaFullScreen,
	onProfilePhotoPress,
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
				right={<OptionsMenuButton onPress={onShowDotsModal} />}
			/>
			<View style={styles.whiteBottomView} />
			<ScrollView
				contentContainerStyle={scrollContainerStyles}
				showsVerticalScrollIndicator={false}
				scrollEnabled={hasPhotos}
			>
				<ProfileTopContainer
					avatar={avatar}
					fullName={fullName}
					userName={userName}
					numberOfFriends={numberOfFriends}
					numberOfLikes={numberOfLikes}
					numberOfPhotos={numberOfPhotos}
					numberOfComments={numberOfComments}
					isCurrentUser={true}
					description={description}
					onProfilePhotoPress={onProfilePhotoPress}
					onAddFriend={() => undefined}
					onEditProfile={onEditProfile}
					getText={getText}
				/>
				{hasPhotos ? (
					<View style={styles.gridContainer}>
						<ProfilePhotoGrid
							dataProvider={dataProvider}
							header={{
								element: <View style={{ width: 1, height: 1 }} />,
								height: 1,
							}}
							disabled={hasPhotos}
							onLoadMorePhotos={onLoadMorePhotos}
							onViewMediaFullScreen={onViewMediaFullScreen}
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
