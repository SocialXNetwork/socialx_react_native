import * as React from 'react';
import {Image, Text, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {AvatarImage, ButtonSizes, PrimaryButton} from '../';
import {Colors, Icons} from '../../environment/theme';
import {ITranslatedProps} from '../../types';
import style from './PeopleSearchResultEntry.style';

const IN_ANIMATION_NAME = 'rotate';
const IN_ANIMATION_DURATION = 300;
const OUT_ANIMATION_NAME = 'fadeOutRight';
const OUT_ANIMATION_DURATION = 300;

interface IPeopleSearchResultEntryProps extends ITranslatedProps {
	avatarURL: string;
	fullName: string;
	location: string;
	selected: boolean;
	addHandler: () => void;
}

const IsFriend: React.SFC = () => (
	<Animatable.View
		animation={IN_ANIMATION_NAME}
		easing={'ease-out'}
		iterationCount={1}
		duration={IN_ANIMATION_DURATION}
	>
		<Image source={Icons.peopleSearchResultIsFriend} resizeMode={'contain'} style={style.isFiendIcon} />
	</Animatable.View>
);

interface IAddFriendProps extends ITranslatedProps {
	afterAnimationHandler: () => void;
	animatedButton: React.RefObject<any>;
}

const AddFriend: React.SFC<IAddFriendProps> = ({afterAnimationHandler, animatedButton, getText}) => (
	<Animatable.View ref={animatedButton}>
		{
			// @ts-ignore
			<PrimaryButton
				label={getText('button.add')}
				size={ButtonSizes.Small}
				autoWidth={true}
				borderColor={Colors.transparent}
				onPress={() => addButtonPressedHandler(afterAnimationHandler, animatedButton)}
			/>
		}
	</Animatable.View>
);

const addButtonPressedHandler = (afterAnimationHandler: () => void, animatedButton: React.RefObject<any>) => {
	animatedButton.current.animate(OUT_ANIMATION_NAME, OUT_ANIMATION_DURATION).then(() => {
		afterAnimationHandler();
	});
};

export const PeopleSearchResultEntry: React.SFC<IPeopleSearchResultEntryProps> = ({
	addHandler,
	selected,
	avatarURL,
	fullName,
	location,
	getText,
}) => {
	const animatedButton: React.RefObject<any> = React.createRef();

	return (
		<View style={[style.container, selected ? style.containerSelected : {}]}>
			<View style={style.leftContainer}>
				<AvatarImage image={avatarURL} style={style.avatarImage} />
				<View style={style.avatarNameContainer}>
					<Text style={style.fullName}>{fullName}</Text>
					<Text style={style.location}>{location}</Text>
				</View>
			</View>
			{selected && <IsFriend />}
			{!selected && <AddFriend afterAnimationHandler={addHandler} animatedButton={animatedButton} getText={getText} />}
		</View>
	);
};
