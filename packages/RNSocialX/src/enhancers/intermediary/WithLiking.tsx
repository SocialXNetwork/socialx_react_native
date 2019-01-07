import * as React from 'react';
import { Animated, Easing } from 'react-native';
import { AnimatedValue } from 'react-navigation';

import { IPostLikeInput } from '../../store/data/posts';
import { ITranslatedProps } from '../../types';

import { WithI18n } from '../connectors/app/WithI18n';
import { WithPosts } from '../connectors/data/WithPosts';
import { WithCurrentUser } from './WithCurrentUser';

export interface IWithLikingEnhancedData {
	animationProgress: AnimatedValue;
	heartAnimation: boolean;
}

export interface IWithLikingEnhancedActions extends ITranslatedProps {
	onLikePost: (postId: string) => void;
	onDoubleTapLikePost: (postId: string) => void;
}

interface IWithLikingtEnhancedProps {
	data: IWithLikingEnhancedData;
	actions: IWithLikingEnhancedActions;
}

interface IWithLikingProps {
	likedByCurrentUser: boolean;
	children(props: IWithLikingtEnhancedProps): JSX.Element;
}

interface IWithLikingState {
	heartAnimation: boolean;
}

export class WithLiking extends React.Component<IWithLikingProps, IWithLikingState> {
	public state = {
		heartAnimation: false,
	};

	private animationProgress = new Animated.Value(0);

	private actions: {
		likePost: (input: IPostLikeInput) => void;
		unlikePost: (input: IPostLikeInput) => void;
	} = {
		likePost: () => undefined,
		unlikePost: () => undefined,
	};

	public render() {
		return (
			<WithI18n>
				{({ getText }) => (
					<WithCurrentUser>
						{({ currentUser }) => (
							<WithPosts>
								{({ likePost, unlikePost }) => {
									this.actions = {
										likePost,
										unlikePost,
									};

									return this.props.children({
										data: {
											animationProgress: this.animationProgress,
											heartAnimation: this.state.heartAnimation,
										},
										actions: {
											onLikePost: (postId) => this.onLikePostHandler(postId, currentUser.alias),
											onDoubleTapLikePost: (postId) =>
												this.onDoubleTapLikeHandler(postId, currentUser.alias),
											getText,
										},
									});
								}}
							</WithPosts>
						)}
					</WithCurrentUser>
				)}
			</WithI18n>
		);
	}

	private onLikePostHandler = async (postId: string, alias: string) => {
		const { likedByCurrentUser } = this.props;

		if (!likedByCurrentUser) {
			this.actions.likePost({ postId, alias });
		} else {
			this.actions.unlikePost({ postId, alias });
		}
	};

	private onDoubleTapLikeHandler = async (postId: string, alias: string) => {
		if (!this.props.likedByCurrentUser) {
			this.setState({ heartAnimation: true });

			Animated.timing(this.animationProgress, {
				toValue: 1,
				duration: 1000,
				easing: Easing.linear,
			}).start(() => {
				this.animationProgress.setValue(0);
				this.setState({ heartAnimation: false });
			});

			this.actions.likePost({ postId, alias });
		} else {
			this.setState({ heartAnimation: true });

			Animated.timing(this.animationProgress, {
				toValue: 1,
				duration: 1000,
				easing: Easing.linear,
			}).start(() => {
				this.animationProgress.setValue(0);
				this.setState({ heartAnimation: false });
			});
		}
	};
}
