import React from 'react';
import {Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {BlurView} from 'react-native-blur';
import Modal from 'react-native-modal';

import {InputSizes, PeopleSearchResultEntry, SXTextInput, TRKeyboardKeys} from '../';
import {WithManagedTransitions, WithTranslations} from '../../enhancers/';
import {OS_TYPES} from '../../environment/consts';
import {FriendsSearchResult} from '../../types';
import style, {customStyleProps} from './ModalTagFriends.style';

const marginBottom = 0; // TODO: this should come from Redux, from an appUI store!

interface IModalTagFriendsProps {
	visible: boolean;
	doneHandler: () => void;
	cancelHandler: () => void;
	blurViewRef: any;
	searchResults: FriendsSearchResult[];
	selectedUsers: FriendsSearchResult[];
	onSearchUpdated: (term: string) => void;
	selectTagUserInModal: (friend: FriendsSearchResult) => void;
}

export const ModalTagFriends: React.SFC<IModalTagFriendsProps> = ({
	visible,
	blurViewRef,
	onSearchUpdated,
	searchResults,
	selectedUsers,
	selectTagUserInModal,
	cancelHandler,
	doneHandler,
}) => {
	return (
		<WithManagedTransitions modalVisible={visible}>
			{({onDismiss, onModalHide}) => (
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
					<WithTranslations>
						{({getText}) => (
							<View style={[style.keyboardView, Platform.OS === OS_TYPES.IOS ? {marginBottom} : {}]}>
								<View style={style.boxContainer}>
									<View style={style.pinkContainer}>
										<Text style={style.title}>{getText('modal.tag.friends.title')}</Text>
										<View style={style.inputContainer}>
											<SXTextInput
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
										{searchResults.map((searchResult: FriendsSearchResult, index: number) => (
											<PeopleSearchResultEntry
												key={index}
												{...searchResult}
												selected={selectedUsers.indexOf(searchResult) > -1}
												addHandler={() => selectTagUserInModal(searchResult)}
											/>
										))}
									</ScrollView>
									<View style={style.buttonsContainer}>
										<TouchableOpacity style={[style.button, style.leftButton]} onPress={cancelHandler}>
											<Text style={[style.buttonText, style.buttonTextCancel]}>{getText('button.back')}</Text>
										</TouchableOpacity>
										<TouchableOpacity style={style.button} onPress={doneHandler}>
											<Text style={[style.buttonText, style.buttonTextConfirm]}>{getText('button.done')}</Text>
										</TouchableOpacity>
									</View>
								</View>
							</View>
						)}
					</WithTranslations>
				</Modal>
			)}
		</WithManagedTransitions>
	);
};
