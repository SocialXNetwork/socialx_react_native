import * as React from 'react';
import {Image, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {
	ButtonSizes,
	CloseButton,
	Header,
	MediaHorizontalScroller,
	PrimaryButton,
	SharePostInput,
} from '../../components';
import {OS_TYPES} from '../../environment/consts';
import {Colors, Icons} from '../../environment/theme';
import {IResizeProps, ITranslatedProps} from '../../types';
import style from './CreateWallPostScreen.style';

interface ICreateWallPostScreenViewProps extends ITranslatedProps, IResizeProps {
	avatarImage?: string;
	shareText: string;
	mediaObjects: string[];
	onShareTextUpdate: (value: string) => void;
	onAddMedia: () => void;
	onPostSend: () => void;
	onClose: () => void;
}

export const CreateWallPostScreenView: React.SFC<ICreateWallPostScreenViewProps> = ({
	avatarImage,
	shareText,
	onShareTextUpdate,
	onAddMedia,
	onPostSend,
	mediaObjects,
	getText,
	marginBottom,
	onClose,
}) => (
	<SafeAreaView style={[style.safeView, Platform.OS === OS_TYPES.IOS ? {paddingBottom: marginBottom} : {}]}>
		<Header title={getText('new.wall.post.screen.title')} left={<CloseButton onClose={onClose} />} />
		<ScrollView contentContainerStyle={style.container} keyboardShouldPersistTaps={'handled'}>
			<SharePostInput
				avatarSource={avatarImage}
				placeholder={getText('new.wall.post.screen.input.placeholder')}
				text={shareText}
				onTextUpdate={onShareTextUpdate}
			/>
			<TouchableOpacity style={style.addMediaButton} onPress={onAddMedia}>
				<Image source={Icons.iconNewPostAddMedia} style={style.photoIcon} resizeMode={'contain'} />
				<Text style={style.addMediaText}>{getText('new.wall.post.screen.attach.media.button')}</Text>
			</TouchableOpacity>
			{mediaObjects.length > 0 && (
				<View style={style.mediaContainer}>
					<MediaHorizontalScroller mediaURIs={mediaObjects} getText={getText} />
				</View>
			)}
			<PrimaryButton
				label={getText('new.wall.post.screen.send.button')}
				size={ButtonSizes.Small}
				autoWidth={true}
				onPress={onPostSend}
				borderColor={Colors.transparent}
			/>
		</ScrollView>
	</SafeAreaView>
);
