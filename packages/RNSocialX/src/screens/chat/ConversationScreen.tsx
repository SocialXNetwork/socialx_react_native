import * as React from 'react';

import { WithNavigationHandlers } from '../../enhancers/intermediary';
import { IWithConversationEnhancedData, WithConversation } from '../../enhancers/screens';

import { INavigationProps } from '../../types';
import { ConversationScreenView } from './ConversationScreen.view';

interface IProps extends INavigationProps, IWithConversationEnhancedData {
	onGoBack: () => void;
}

class Screen extends React.Component<IProps> {
	public render() {
		return <ConversationScreenView profile={this.props.profile} onGoBack={this.props.onGoBack} />;
	}
}

export const ConversationScreen = (props: INavigationProps) => (
	<WithNavigationHandlers navigation={props.navigation}>
		{({ actions }) => (
			<WithConversation>
				{(conv) => <Screen {...props} {...conv.data} onGoBack={actions.onGoBack} />}
			</WithConversation>
		)}
	</WithNavigationHandlers>
);
