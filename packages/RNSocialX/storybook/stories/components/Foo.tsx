import {storiesOf} from '@storybook/react-native';
import React from 'react';

import {Foo} from '../../../src/components';

storiesOf('Components', module).add('Foo', () => <Foo message={'Hey there, I am Foo!'} style={{}} />);
