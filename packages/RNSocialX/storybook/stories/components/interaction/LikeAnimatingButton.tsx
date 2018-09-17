import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {LikeAnimatingButton} from '../../../../src/components';
import CenterView from '../../../helpers/CenterView';

class LikeAnimatingButtonStory extends React.Component {
	public state = {
		likedByMe: false,
	};

	public render() {
		return (
			<LikeAnimatingButton
				label={'Like'}
				onPress={() =>
					this.setState((prevState: {likedByMe: boolean}) => {
						return {
							likedByMe: !prevState.likedByMe,
						};
					})
				}
				likedByMe={this.state.likedByMe}
				getText={(text) => text}
			/>
		);
	}
}

storiesOf('Components/interaction', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('LikeAnimatingButton', () => <LikeAnimatingButtonStory />);
