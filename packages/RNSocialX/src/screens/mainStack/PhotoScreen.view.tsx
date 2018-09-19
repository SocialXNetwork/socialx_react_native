import * as React from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
	AddFriendsList,
	CheckboxButtonWithIcon,
	MediaHorizontalScroller,
	SharePostInput,
	WithInlineLoader,
} from '../../components';
import {IWithLoaderProps} from '../../components/inlineLoader';
import {FriendsSearchResult, ITranslatedProps} from '../../types';
import style, {customStyleProps} from './PhotoScreen.style';

interface IPhotoScreenViewProps extends IWithLoaderProps, ITranslatedProps {
	avatarURL?: string;
	mediaObjects: string[];
	showTagFriendsModal: () => void;
	taggedFriends: FriendsSearchResult[];
	locationEnabled: boolean;
	tagFriends: boolean;
	location: string;
	onLocationToggle: () => void;
	onLocationTextUpdate: (value: string) => void;
	onTagFriendsToggle: () => void;
	shareText: string;
	onShareTextUpdate: (value: string) => void;
	onAddMedia: () => void;
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
	<View style={style.checkboxButtonContainer}>
		<CheckboxButtonWithIcon
			iconSource={customStyleProps.iconLocationPin}
			selected={locationEnabled}
			text={checkboxLabel}
			onPress={onLocationToggle}
		/>
		{locationEnabled && (
			<View>
				<Text style={style.smallText}>{locationLabel}</Text>
				<View style={style.withMaxHeight}>
					<TextInput
						autoFocus={true}
						autoCorrect={true}
						underlineColorAndroid={customStyleProps.underlineColorTransparent}
						numberOfLines={2}
						multiline={true}
						style={style.multilineTextInput}
						onChangeText={onLocationTextUpdate}
					/>
				</View>
			</View>
		)}
	</View>
);

interface ITagFriendsSectionProps {
	tagFriends: boolean;
	onTagFriendsToggle: () => void;
	taggedFriends: FriendsSearchResult[];
	showTagFriendsModal: () => void;
	checkboxLabel: string;
}

const TagFriendsSection: React.SFC<ITagFriendsSectionProps> = ({
	onTagFriendsToggle,
	tagFriends,
	taggedFriends,
	showTagFriendsModal,
	checkboxLabel,
}) => {
	return (
		<View style={style.checkboxButtonContainer}>
			<CheckboxButtonWithIcon
				iconSource={customStyleProps.iconInviteFriends}
				selected={tagFriends}
				text={checkboxLabel}
				onPress={onTagFriendsToggle}
			/>
			{tagFriends && <AddFriendsList taggedFriends={taggedFriends} showTagFriendsModal={showTagFriendsModal} />}
		</View>
	);
};

export const PhotoScreenView: React.SFC<IPhotoScreenViewProps> = ({
	avatarURL,
	mediaObjects,
	locationEnabled,
	onLocationToggle,
	onLocationTextUpdate,
	taggedFriends,
	onTagFriendsToggle,
	tagFriends,
	showTagFriendsModal,
	shareText,
	onShareTextUpdate,
	onAddMedia,
	getText,
	isLoading,
}) => (
	<WithInlineLoader isLoading={isLoading}>
		<KeyboardAwareScrollView style={style.scrollView} alwaysBounceVertical={true} keyboardShouldPersistTaps={'handled'}>
			<SharePostInput
				avatarSource={avatarURL}
				placeholder={getText('photo.screen.share.input.placeholder')}
				text={shareText}
				onTextUpdate={onShareTextUpdate}
			/>
			<View style={style.photoContainer}>
				<MediaHorizontalScroller mediaURIs={mediaObjects} />
			</View>
			<View style={style.addMediaContainer}>
				<TouchableOpacity style={style.addMediaButton} onPress={onAddMedia}>
					<Image source={customStyleProps.iconNewPostAddMedia} style={style.photoIcon} resizeMode={'contain'} />
					<Text style={style.addMediaText}>{getText('photo.screen.add.media')}</Text>
				</TouchableOpacity>
			</View>
			<View style={style.paddingContainer}>
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
					showTagFriendsModal={showTagFriendsModal}
					checkboxLabel={getText('photo.screen.tag.friends.checkbox')}
				/>
			</View>
		</KeyboardAwareScrollView>
	</WithInlineLoader>
);
