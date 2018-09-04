import * as React from 'react';
import {Image, Text, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {AvatarImage, ButtonSizes, PrimaryButton} from '../';
import {WithTranslations} from '../../enhancers';
import {Colors, Icons} from '../../environment/theme';
import style from './PeopleSearchResultEntry.style';

const IN_ANIMATION_NAME = 'rotate';
const IN_ANIMATION_DURATION = 300;
const OUT_ANIMATION_NAME = 'fadeOutRight';
const OUT_ANIMATION_DURATION = 300;

interface IGroupCreateSearchResultEntryProps {
	avatarURL?: string;
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

interface IAddFriendProps {
	afterAnimationHandler: () => void;
	animatedButton: React.RefObject<any>;
}

const AddFriend: React.SFC<IAddFriendProps> = ({afterAnimationHandler, animatedButton}) => (
	<Animatable.View ref={animatedButton}>
		<WithTranslations>
			{({getText}) => (
				<PrimaryButton
					label={getText('button.add')}
					size={ButtonSizes.Small}
					autoWidth={true}
					borderColor={Colors.transparent}
					onPress={() => addButtonPressedHandler(afterAnimationHandler, animatedButton)}
				/>
			)}
		</WithTranslations>
	</Animatable.View>
);

const addButtonPressedHandler = (afterAnimationHandler: () => void, animatedButton: React.RefObject<any>) => {
	animatedButton.current.animate(OUT_ANIMATION_NAME, OUT_ANIMATION_DURATION).then(() => {
		afterAnimationHandler();
	});
};

export const PeopleSearchResultEntry: React.SFC<IGroupCreateSearchResultEntryProps> = ({
	addHandler,
	selected,
	avatarURL,
	fullName,
	location,
}) => {
	const animatedButton: React.RefObject<any> = React.createRef();

	return (
		<View style={[style.container, selected ? style.containerSelected : {}]}>
			<View style={style.leftContainer}>
				<AvatarImage image={{uri: avatarURL}} style={style.avatarImage} />
				<View style={style.avatarNameContainer}>
					<Text style={style.fullName}>{fullName}</Text>
					<Text style={style.location}>{location}</Text>
				</View>
			</View>
			{selected && <IsFriend />}
			{!selected && <AddFriend afterAnimationHandler={addHandler} animatedButton={animatedButton} />}
		</View>
	);
};
