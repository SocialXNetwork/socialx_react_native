import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { LikeAnimatingButton } from '../../../../src/components';
import { getTextMock } from '../../../../src/mocks';
import CenterView from '../../../helpers/CenterView';

class LikeAnimatingButtonStory extends React.Component {
	public state = {
		likedByCurrentUser: false,
	};

	public render() {
		return (
			<LikeAnimatingButton
				label="Like"
				onLikePress={() =>
					this.setState((prevState: { likedByCurrentUser: boolean }) => {
						return {
							likedByCurrentUser: !prevState.likedByCurrentUser,
						};
					})
				}
				likedByCurrentUser={this.state.likedByCurrentUser}
				likeFailed={false}
				getText={getTextMock}
			/>
		);
	}
}

storiesOf('Components/interaction', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('LikeAnimatingButton', () => <LikeAnimatingButtonStory />);
