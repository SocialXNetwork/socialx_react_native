import * as React from 'react';
import { WebView } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { Header } from '../../components';
import { ITranslatedProps } from '../../types';
import styles from './TermsAndConditionsScreen.style';

interface ITermsAndConditionsScreenViewProps extends ITranslatedProps {
	localSource: any;
	onGoBack: () => void;
}

export const TermsAndConditionsScreenView: React.SFC<ITermsAndConditionsScreenViewProps> = ({
	localSource,
	onGoBack,
	getText,
}) => (
	<SafeAreaView forceInset={{ top: 'never' }} style={styles.container}>
		<Header
			title={getText('terms.and.conditions.screen.title')}
			back={true}
			onPressBack={onGoBack}
		/>
		<WebView source={localSource} />
	</SafeAreaView>
);
