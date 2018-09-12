import * as React from 'react';

import {IFeedProps, UserFeedScreen} from './UserFeedScreen';

export const FriendsUserFeed: React.SFC<IFeedProps> = (props: any) => (
	<UserFeedScreen shareSectionPlaceholder={'Share with your friends what you think'} {...props} />
);
