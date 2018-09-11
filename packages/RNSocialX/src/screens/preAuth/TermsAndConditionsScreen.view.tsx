import * as React from 'react';
import {SafeAreaView, WebView} from 'react-native';

import styles from './TermsAndConditionsScreen.style';

export const TermsAndConditionsScreenView: React.SFC<{localSource: any}> = ({localSource}) => (
	<SafeAreaView style={styles.container}>
		<WebView source={localSource} />
	</SafeAreaView>
);
