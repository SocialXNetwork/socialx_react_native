import * as React from 'react';
import {SafeAreaView, WebView} from 'react-native';

import {Header, HeaderButton} from '../../components';
import {ITranslatedProps} from '../../types';
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
	<SafeAreaView style={styles.container}>
		{
			// @ts-ignore
			<Header
				title={getText('terms.and.conditions.screen.title')}
				// @ts-ignore
				left={<HeaderButton iconName={'ios-arrow-back'} onPress={onGoBack} />}
			/>
		}
		<WebView source={localSource} />
	</SafeAreaView>
);
