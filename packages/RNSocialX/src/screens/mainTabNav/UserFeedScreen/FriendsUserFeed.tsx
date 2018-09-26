import * as React from 'react';

import { WithUserFeed } from '../../../enhancers/screens';
import { FEED_TYPES } from '../../../environment/consts';
import { INavigationProps, Screen } from './UserFeedScreen';

export const FriendsUserFeed = ({ navigation }: INavigationProps) => (
	<WithUserFeed>
		{({ data, actions }) => (
			<Screen
				shareSectionPlaceholder={'Share with your friends what you think'}
				feedType={FEED_TYPES.FRIENDS}
				navigation={navigation}
				{...data}
				{...actions}
			/>
		)}
	</WithUserFeed>
);
