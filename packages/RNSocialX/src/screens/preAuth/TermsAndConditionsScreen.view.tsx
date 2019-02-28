import * as React from 'react';
import { WebView, WebViewHtmlSource, WebViewUriSource } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { Header } from '../../components';
import { IDictionary } from '../../types';
import styles from './TermsAndConditionsScreen.style';

interface ITermsAndConditionsScreenViewProps extends IDictionary {
	source: WebViewHtmlSource | WebViewUriSource;
	onGoBack: () => void;
}

export const TermsAndConditionsScreenView: React.SFC<ITermsAndConditionsScreenViewProps> = ({
	source,
	dictionary,
	onGoBack,
}) => (
	<SafeAreaView forceInset={{ top: 'never' }} style={styles.container}>
		<Header
			title={dictionary.screens.termsAndConditions.title}
			back={true}
			onPressBack={onGoBack}
		/>
		<WebView source={source} />
	</SafeAreaView>
);
