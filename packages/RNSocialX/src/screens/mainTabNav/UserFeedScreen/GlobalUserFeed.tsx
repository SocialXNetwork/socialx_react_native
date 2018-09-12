import * as React from 'react';

import {IFeedProps, UserFeedScreen} from './UserFeedScreen';

export const GlobalUserFeed: React.SFC<IFeedProps> = (props: any) => (
	<UserFeedScreen shareSectionPlaceholder={'Share with the world what you think'} {...props} />
);
