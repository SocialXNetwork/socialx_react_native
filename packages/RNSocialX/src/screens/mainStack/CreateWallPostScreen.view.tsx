import * as React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import {
	ButtonSizes,
	CloseButton,
	Header,
	MediaHorizontalScroller,
	PrimaryButton,
	SharePostInput,
} from '../../components';
import { Colors, Icons } from '../../environment/theme';
import { ITranslatedProps } from '../../types';

import styles, { buttonWidth } from './CreateWallPostScreen.style';

interface ICreateWallPostScreenViewProps extends ITranslatedProps {
	avatar: string;
	caption: string;
	media: string[];
	onChangeText: (value: string) => void;
	onAddMedia: () => void;
	onCreatePost: () => void;
	onClose: () => void;
}

export const CreateWallPostScreenView: React.SFC<ICreateWallPostScreenViewProps> = ({
	avatar,
	media,
	caption,
	onChangeText,
	onAddMedia,
	onCreatePost,
	onClose,
	getText,
}) => (
	<View style={styles.container}>
		<Header
			title={getText('new.wall.post.screen.title')}
			left={<CloseButton onClose={onClose} />}
		/>
		<ScrollView contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
			<SharePostInput
				avatar={avatar}
				placeholder={getText('new.wall.post.screen.input.placeholder')}
				value={caption}
				onChangeText={onChangeText}
			/>
			<TouchableOpacity style={styles.addMediaButton} onPress={onAddMedia}>
				<Image source={Icons.iconNewPostAddMedia} style={styles.photoIcon} resizeMode="contain" />
				<Text style={styles.addMediaText}>
					{getText('new.wall.post.screen.attach.media.button')}
				</Text>
			</TouchableOpacity>
			{media.length > 0 && (
				<View style={styles.mediaContainer}>
					<MediaHorizontalScroller mediaURIs={media} getText={getText} />
				</View>
			)}
			<View style={styles.buttonContainer}>
				<PrimaryButton
					label={getText('new.wall.post.screen.create.button')}
					size={ButtonSizes.Small}
					width={buttonWidth}
					onPress={onCreatePost}
					borderColor={Colors.transparent}
					disabled={caption.length === 0}
				/>
			</View>
		</ScrollView>
	</View>
);
