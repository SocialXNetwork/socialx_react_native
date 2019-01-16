import * as React from 'react';

import { WithFeed } from '../../../enhancers/screens';
import { FEED_TYPES } from '../../../environment/consts';
import { INavigationProps } from '../../../types';
import { Feed } from './Feed';

export const FriendsFeed = ({ navigation }: INavigationProps) => (
	<WithFeed type={FEED_TYPES.FRIENDS}>
		{({ data, actions }) => (
			<Feed
				shareMessage="Share with your friends what you think"
				feedType={FEED_TYPES.FRIENDS}
				navigation={navigation}
				{...data}
				{...actions}
			/>
		)}
	</WithFeed>
);
