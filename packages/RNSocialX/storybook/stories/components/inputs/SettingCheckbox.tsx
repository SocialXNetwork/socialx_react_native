import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { SettingCheckbox } from '../../../../src/components/';
import CenterView from '../../../helpers/CenterView';

interface ISettingCheckboxStoryState {
	value: boolean;
}

class SettingCheckboxStory extends React.Component<
	{},
	ISettingCheckboxStoryState
> {
	public state = {
		value: false,
	};

	public render() {
		return (
			<SettingCheckbox
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
	.add('SettingCheckbox', () => <SettingCheckboxStory />);
