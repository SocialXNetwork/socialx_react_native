import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { Checkbox } from '../../../../src/components/';
import CenterView from '../../../helpers/CenterView';

interface ICheckboxStoryState {
	value: boolean;
}

class CheckboxStory extends React.Component<{}, ICheckboxStoryState> {
	public state = {
		value: false,
	};

	public render() {
		return (
			<Checkbox
				title="Are you a vegetarian?"
				description={false}
				value={this.state.value}
				onValueUpdated={this.onValueUpdatedHandler}
			/>
		);
	}

	private onValueUpdatedHandler = () => {
		this.setState((prevState) => {
			return {
				value: !prevState.value,
			};
		});
	};
}

storiesOf('Components/inputs', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('Checkbox', () => <CheckboxStory />);
