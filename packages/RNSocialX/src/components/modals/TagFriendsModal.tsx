import * as React from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { BlurView } from 'react-native-blur';
import Modal from 'react-native-modal';

import {
	IManagedModal,
	InputSizes,
	PeopleSearchResultEntry,
	PrimaryTextInput,
	TRKeyboardKeys,
} from '..';
import { OS_TYPES } from '../../environment/consts';
import { IFriendsSearchResult, IResizeProps, ITranslatedProps } from '../../types';
import style, { customStyleProps } from './TagFriendsModal.style';

interface ITagFriendsModalProps extends ITranslatedProps, IManagedModal, IResizeProps {
	visible: boolean;
	doneHandler: () => void;
	cancelHandler: () => void;
	blurViewRef: any;
	searchResults: IFriendsSearchResult[];
	selectedUsers: IFriendsSearchResult[];
	onSearchUpdated: (term: string) => void;
	selectTagUserInModal: (friend: IFriendsSearchResult) => void;
}

export const TagFriendsModal: React.SFC<ITagFriendsModalProps> = ({
	visible,
	blurViewRef,
	onSearchUpdated,
	searchResults,
	selectedUsers,
	selectTagUserInModal,
	cancelHandler,
	doneHandler,
	getText,
	onDismiss,
	onModalHide,
	marginBottom,
}) => {
	return (
		<Modal
			onDismiss={onDismiss}
			onModalHide={onModalHide}
			isVisible={visible}
			backdropOpacity={0}
			animationIn={'slideInUp'}
			animationOut={'slideOutUp'}
			style={style.container}
		>
			<BlurView style={style.blurView} viewRef={blurViewRef} blurType={'dark'} blurAmount={2} />
			<View style={[style.keyboardView, Platform.OS === OS_TYPES.IOS ? { marginBottom } : {}]}>
				<View style={style.boxContainer}>
					<View style={style.pinkContainer}>
						<Text style={style.title}>{getText('modal.tag.friends.title')}</Text>
						<View style={style.inputContainer}>
							<PrimaryTextInput
								autoFocus={true}
								autoCorrect={true}
								onChangeText={onSearchUpdated}
								placeholder={getText('modal.tag.friends.search.box.placeholder')}
								icon={'search'}
								canCancel={false}
								size={InputSizes.Small}
								borderColor={customStyleProps.searchInputBorderColor}
								iconColor={customStyleProps.searchInputIconColor}
								returnKeyType={TRKeyboardKeys.done}
								blurOnSubmit={true}
							/>
						</View>
					</View>
					<ScrollView
						contentContainerStyle={style.resultsContainer}
						alwaysBounceVertical={false}
						keyboardShouldPersistTaps={'handled'}
					>
						{searchResults.map((searchResult: IFriendsSearchResult, index: number) => (
							<PeopleSearchResultEntry
								key={index}
								avatarURL={searchResult.avatarURL}
								fullName={searchResult.fullName}
								location={searchResult.location}
								selected={selectedUsers.indexOf(searchResult) > -1}
								addHandler={() => selectTagUserInModal(searchResult)}
								getText={getText}
							/>
						))}
					</ScrollView>
					<View style={style.buttonsContainer}>
						<TouchableOpacity style={[style.button, style.leftButton]} onPress={cancelHandler}>
							<Text style={[style.buttonText, style.buttonTextCancel]}>
								{getText('button.back')}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity style={style.button} onPress={doneHandler}>
							<Text style={[style.buttonText, style.buttonTextConfirm]}>
								{getText('button.done')}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};
