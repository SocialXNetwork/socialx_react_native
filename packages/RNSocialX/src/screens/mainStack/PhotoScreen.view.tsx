import * as React from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import {
	AddFriendsList,
	ButtonSizes,
	CheckboxButtonWithIcon,
	CloseButton,
	Header,
	MediaHorizontalScroller,
	PrimaryButton,
	SharePostInput,
} from '../../components';
import { IFriendsSearchResult, ITranslatedProps } from '../../types';

import styles, { defaultStyles } from './PhotoScreen.style';

interface IPhotoScreenViewProps extends ITranslatedProps {
	avatar: string;
	mediaObjects: string[];
	taggedFriends: IFriendsSearchResult[];
	locationEnabled: boolean;
	tagFriends: boolean;
	location: string;
	caption: string;
	onShowTagFriends: () => void;
	onLocationToggle: () => void;
	onLocationTextUpdate: (value: string) => void;
	onTagFriendsToggle: () => void;
	onChangeText: (value: string) => void;
	onAddMedia: () => void;
	onCreatePost: () => void;
	onClose: () => void;
}

interface ILocationSectionProps {
	locationEnabled: boolean;
	onLocationToggle: () => void;
	onLocationTextUpdate: (value: string) => void;
	checkboxLabel: string;
	locationLabel: string;
}

const LocationSection: React.SFC<ILocationSectionProps> = ({
	locationEnabled,
	onLocationToggle,
	onLocationTextUpdate,
	locationLabel,
	checkboxLabel,
}) => (
	<View style={styles.checkboxButtonContainer}>
		<CheckboxButtonWithIcon
			iconSource={defaultStyles.location}
			selected={locationEnabled}
			text={checkboxLabel}
			onPress={onLocationToggle}
		/>
		{locationEnabled && (
			<View>
				<Text style={styles.smallText}>{locationLabel}</Text>
				<View style={styles.withMaxHeight}>
					<TextInput
						autoFocus={true}
						autoCorrect={true}
						underlineColorAndroid={defaultStyles.transparent}
						numberOfLines={2}
						multiline={true}
						style={styles.multilineTextInput}
						onChangeText={onLocationTextUpdate}
					/>
				</View>
			</View>
		)}
	</View>
);

interface ITagFriendsSectionProps {
	tagFriends: boolean;
	taggedFriends: IFriendsSearchResult[];
	checkboxLabel: string;
	onTagFriendsToggle: () => void;
	onShowTagFriends: () => void;
}

const TagFriendsSection: React.SFC<ITagFriendsSectionProps> = ({
	onTagFriendsToggle,
	tagFriends,
	taggedFriends,
	onShowTagFriends,
	checkboxLabel,
}) => {
	return (
		<View style={styles.checkboxButtonContainer}>
			<CheckboxButtonWithIcon
				iconSource={defaultStyles.inviteFriends}
				selected={tagFriends}
				text={checkboxLabel}
				onPress={onTagFriendsToggle}
			/>
			{tagFriends && (
				<AddFriendsList taggedFriends={taggedFriends} onShowTagFriends={onShowTagFriends} />
			)}
		</View>
	);
};

export const PhotoScreenView: React.SFC<IPhotoScreenViewProps> = ({
	avatar,
	mediaObjects,
	locationEnabled,
	onLocationToggle,
	onLocationTextUpdate,
	taggedFriends,
	onTagFriendsToggle,
	tagFriends,
	onShowTagFriends,
	caption,
	onChangeText,
	onAddMedia,
	onCreatePost,
	onClose,
	getText,
}) => (
	<View style={styles.container}>
		<Header title={getText('photo.screen.title')} left={<CloseButton onClose={onClose} />} />
		<ScrollView contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
			<SharePostInput
				avatar={avatar}
				placeholder={getText('photo.screen.share.input.placeholder')}
				value={caption}
				onChangeText={onChangeText}
			/>
			<View style={styles.photoContainer}>
				<MediaHorizontalScroller mediaURIs={mediaObjects} getText={getText} />
			</View>
			<View style={styles.addMediaContainer}>
				<TouchableOpacity style={styles.addMediaButton} onPress={onAddMedia}>
					<Image source={defaultStyles.addMedia} style={styles.photoIcon} resizeMode="contain" />
					<Text style={styles.addMediaText}>{getText('photo.screen.add.media')}</Text>
				</TouchableOpacity>
			</View>
			{/* <View style={styles.paddingContainer}>
				<LocationSection
					locationEnabled={locationEnabled}
					onLocationToggle={onLocationToggle}
					onLocationTextUpdate={onLocationTextUpdate}
					checkboxLabel={getText('photo.screen.location.checkbox')}
					locationLabel={getText('photo.screen.location.small.label')}
				/>
				<TagFriendsSection
					tagFriends={tagFriends}
					taggedFriends={taggedFriends}
					onTagFriendsToggle={onTagFriendsToggle}
					onShowTagFriends={onShowTagFriends}
					checkboxLabel={getText('photo.screen.tag.friends.checkbox')}
				/>
			</View> */}
			<View style={styles.buttonContainer}>
				<PrimaryButton
					label={getText('new.wall.post.screen.create.button')}
					size={ButtonSizes.Small}
					width={defaultStyles.buttonWidth}
					onPress={onCreatePost}
					borderColor={defaultStyles.transparent}
					disabled={caption.length === 0}
				/>
			</View>
		</ScrollView>
	</View>
);
