import * as React from 'react';
import { connect } from 'react-redux';

import { AvatarImage } from '../../';
import { IApplicationState, selectAvatar } from '../../../store/selectors';

import styles from './Avatar.style';

interface IAvatarProps {
	alias: string;
	index?: number;
}

interface IProps extends IAvatarProps {
	avatar: string;
}

export const Component: React.SFC<IProps> = ({ avatar, index }) => {
	if (index) {
		return (
			<AvatarImage
				image={avatar}
				style={[styles.avatar, { transform: [{ translateX: -index * 10 }] }]}
			/>
		);
	}

	return <AvatarImage image={avatar} style={styles.avatar} />;
};

const mapStateToProps = (state: IApplicationState, props: IAvatarProps) => {
	return {
		avatar: selectAvatar(state.data.profiles, props.alias),
	};
};

export const Avatar = connect(mapStateToProps)(Component);
