import React from 'react';

import {
	IWithHeaderCollapseEnhancedData,
	WithHeaderCollapse,
	WithNavigationHandlers,
} from '../../enhancers/intermediary';
import { IWithAllMessagesEnhancedData, WithAllMessages } from '../../enhancers/screens';

import { FlatList } from 'react-native';
import { INavigationProps } from '../../types';
import { AllMessagesScreenView } from './AllMessagesScreen.view';

const messages: string[] = [
	'jaakee',
	'hackerman',
	'letsgheek',
	'Philip',
	'will2k',
	'hackerman',
	'jaakee',
	'letsgheek',
	'Philip',
	'will2k',
	'hackerman',
	'jaakee',
	'letsgheek',
	'Philip',
	'will2k',
	'jaakee',
	'hackerman',
	'letsgheek',
	'Philip',
	'will2k',
	'hackerman',
	'jaakee',
	'letsgheek',
	'Philip',
	'will2k',
	'hackerman',
	'jaakee',
	'letsgheek',
	'Philip',
	'will2k',
];
const people: string[] = ['letsgheek', 'Philip', 'will2k'];

interface IProps
	extends INavigationProps,
		IWithAllMessagesEnhancedData,
		IWithHeaderCollapseEnhancedData {
	expand: () => void;
	scrollToTop: (ref: React.RefObject<FlatList<any>>, isActive: boolean) => void;
	onOpenConversation: (alias: string) => void;
}

interface IState {
	messages: string[];
	people: string[];
}

class Screen extends React.Component<IProps, IState> {
	public state = {
		messages,
		people,
	};

	public render() {
		const {
			scrollY,
			headerTranslate,
			listTranslate,
			opacity,
			dictionary,
			navigation,
			expand,
			scrollToTop,
			onOpenConversation,
		} = this.props;

		return (
			<AllMessagesScreenView
				messages={this.state.messages}
				people={this.state.people}
				headerTranslate={headerTranslate}
				listTranslate={listTranslate}
				opacity={opacity}
				scrollY={scrollY}
				navigation={navigation}
				dictionary={dictionary}
				expandHeader={expand}
				scrollToTop={scrollToTop}
				onRemoveMessage={this.onRemoveMessageHandler}
				onEntryPress={onOpenConversation}
			/>
		);
	}

	private onRemoveMessageHandler = (alias: string) => {
		this.setState((currentState) => ({
			messages: currentState.messages.filter((a) => a !== alias),
		}));
	};
}

export const AllMessagesScreen = (props: INavigationProps) => (
	<WithHeaderCollapse>
		{(collapse) => (
			<WithNavigationHandlers>
				{({ actions }) => (
					<WithAllMessages>
						{({ data }) => (
							<Screen
								{...props}
								{...data}
								{...collapse.data}
								expand={collapse.actions.expand}
								scrollToTop={collapse.actions.scrollToTop}
								onOpenConversation={actions.onOpenConversation}
							/>
						)}
					</WithAllMessages>
				)}
			</WithNavigationHandlers>
		)}
	</WithHeaderCollapse>
);
