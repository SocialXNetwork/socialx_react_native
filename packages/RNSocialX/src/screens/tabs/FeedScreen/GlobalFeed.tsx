import * as React from 'react';

import { WithFeed } from '../../../enhancers/screens';
import { FEED_TYPES } from '../../../environment/consts';
import { INavigationProps } from '../../../types';
import { Feed } from './Feed';

export const GlobalFeed = ({ navigation }: INavigationProps) => (
	<WithFeed type={FEED_TYPES.GLOBAL}>
		{({ data, actions }) => (
			<Feed
				shareMessage="Share with the world what you think"
				feedType={FEED_TYPES.GLOBAL}
				navigation={navigation}
				{...data}
				{...actions}
			/>
		)}
	</WithFeed>
);
