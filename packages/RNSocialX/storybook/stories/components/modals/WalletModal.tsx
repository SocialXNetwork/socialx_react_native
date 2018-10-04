import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { WalletModal } from '../../../../src/components';
import { getTextMock } from '../../../../src/mocks';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/modals', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('WalletModal', () => {
		const visible = boolean('visible', true);

		return (
			<WalletModal
				visible={visible}
				walletAddress="19ga5eah9wediewbdib23irbua"
				dismissModal={action('dismissModal')}
				getText={getTextMock}
			/>
		);
	});
