import * as React from 'react';

import { WithFeed } from '../../../enhancers/screens';
import { FEED_TYPES } from '../../../environment/consts';
import { INavigationProps } from '../../../types';
import { FeedList } from './FeedList';

export const GlobalFeed = ({ navigation }: INavigationProps) => (
	<WithFeed type={FEED_TYPES.GLOBAL}>
		{({ data, actions }) => (
			<FeedList
				shareMessage="Share with the world what you think"
				feedType={FEED_TYPES.GLOBAL}
				navigation={navigation}
				{...data}
				{...actions}
			/>
		)}
	</WithFeed>
);
