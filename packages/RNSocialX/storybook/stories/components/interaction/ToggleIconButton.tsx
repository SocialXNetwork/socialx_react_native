import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {ToggleIconButton} from '../../../../src/components';
import CenterView from '../../../helpers/CenterView';

const selected = 'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&h=350';
const unselected =
	'https://media.istockphoto.com/photos/christmas-lights-defocused-background-bokeh-gold-blue-picture-id613518332?k=6&m=613518332&s=612x612&w=0&h=Own5MdgJXjNhFd0YUyED1UP3mQsHeNhfML9F-DQYdYw=';

class ToggleIconButtonStory extends React.Component {
	public state = {
		selected: false,
	};

	public render() {
		return (
			<ToggleIconButton
				onPress={this.onPressHandler}
				selected={this.state.selected}
				// @ts-ignore
				selectedSource={{uri: selected}}
				// @ts-ignore
				unselectedSource={{uri: unselected}}
				iconStyle={{width: '50%', height: '50%'}}
			/>
		);
	}

	private onPressHandler = () => {
		this.setState((prevState: {selected: boolean}) => {
			return {
				selected: !prevState.selected,
			};
		});
	};
}

storiesOf('Components/interaction', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('ToggleIconButton', () => <ToggleIconButtonStory />);
