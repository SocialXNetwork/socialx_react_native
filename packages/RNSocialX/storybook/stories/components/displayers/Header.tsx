import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { Header } from '../../../../src/components';

storiesOf('Components/displayers', module)
	.addDecorator(withKnobs)
	.add('Header', () => {
		const title = text('title', '');
		const logo = boolean('logo', true);

		return <Header logo={logo} title={title} />;
	});
