import * as React from 'react';

import { IWithLoaderProps } from '../../components/inlineLoader';
import { ITranslatedProps } from '../../types';
import { AdsManagementOverviewScreenView } from './AdsManagementOverviewScreen.view';

interface IAdsManagementOverviewScreenProps
	extends IWithLoaderProps,
		ITranslatedProps {}

export class AdsManagementOverviewScreen extends React.Component<
	IAdsManagementOverviewScreenProps
> {
	public render() {
		const { getText } = this.props;
		return null;
		// return (
		// 	<AdsManagementOverviewScreenView
		// 		onClose={this.closeScreenHandler}
		// 		getText={getText}
		// 	/>
		// );
	}

	private closeScreenHandler = () => {
		console.log('closeScreenHandler');
	};
}
