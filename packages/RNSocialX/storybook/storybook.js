import { Root } from 'native-base';
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';
import SplashScreen from 'react-native-smart-splash-screen';

import { KeyboardContext } from '../src/environment/consts';
import { ManagedKeyboard } from '../src/components/managedTransitions';

// import stories (components or screens)
configure(() => {
  require('./stories/screens');
}, module);

// This assumes that storybook is running on the same host as your RN packager,
// to set manually use, e.g. host: 'localhost' option
const StorybookUIRoot = getStorybookUI({ port: 7007, onDeviceUI: true });

// react-native hot module loader must take in a Class - https://github.com/facebook/react-native/issues/10991
// https://github.com/storybooks/storybook/issues/2081
// eslint-disable-next-line react/prefer-stateless-function
class StorybookUIHMRRoot extends Component {
  componentDidMount() {
		SplashScreen.close({
			animationType: SplashScreen.animationType.fade,
			duration: 1000,
			delay: 100,
		});
	}


  render() {
    return (
      <Root>
        <ManagedKeyboard>
          {(keyboardContextProps) => (
            <KeyboardContext.Provider value={keyboardContextProps}>
              <StorybookUIRoot/>
            </KeyboardContext.Provider>
          )}
        </ManagedKeyboard>
      </Root>
    );
  }
}

AppRegistry.registerComponent('RNSocialX', () => StorybookUIHMRRoot);
export default StorybookUIHMRRoot;
