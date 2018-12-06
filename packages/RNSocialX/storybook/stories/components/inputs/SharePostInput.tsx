import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { SharePostInput } from '../../../../src/components/';
import CenterView from '../../../helpers/CenterView';

const image = 'https://www.w3schools.com/w3css/img_lights.jpg';

class SharePostInputStory extends React.Component {
	public state = {
		value: '',
	};

	public render() {
		return (
			<SharePostInput
				avatar={image}
				placeholder="Type something"
				value={this.state.value}
				onChangeText={(value) => this.setState({ value })}
			/>
		);
	}
}

storiesOf('Components/inputs', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('SharePostInput', () => <SharePostInputStory />);
