import * as React from 'react';
import { Animated, Easing } from 'react-native';
import { AnimatedValue } from 'react-navigation';

import { SCREENS } from '../../environment/consts';
import { IError, ILike, INavigationProps, ITranslatedProps } from '../../types';

import { ActionTypes } from '../../store/data/posts/Types';
import { WithI18n } from '../connectors/app/WithI18n';
import { WithNavigationParams } from '../connectors/app/WithNavigationParams';
import { WithPosts } from '../connectors/data/WithPosts';

export interface IWithLikingEnhancedData {
	optLikedByCurrentUser: boolean;
	likeDisabled: boolean;
	recentLikes: {
		name: string | null;
		total: number;
	};
	animationProgress: AnimatedValue;
	heartAnimation: boolean;
}

export interface IWithLikingEnhancedActions extends ITranslatedProps {
	onLikePost: (postId: string) => void;
	onDoubleTapLikePost: (postId: string) => void;
	onViewLikes: () => void;
}

interface IWithLikingtEnhancedProps {
	data: IWithLikingEnhancedData;
	actions: IWithLikingEnhancedActions;
}

interface IWithLikingProps extends INavigationProps {
	likedByCurrentUser: boolean;
	likes: ILike[];
	currentUserName: string;
	errors: IError[];
	children(props: IWithLikingtEnhancedProps): JSX.Element;
}

interface IWithLikingState {
	optLikedByCurrentUser: boolean;
	likeDisabled: boolean;
	likePostFailed: boolean;
	recentLikes: {
		name: string | null;
		total: number;
	};
	heartAnimation: boolean;
}

export class WithLiking extends React.Component<IWithLikingProps, IWithLikingState> {
	public static getDerivedStateFromProps(
		nextProps: IWithLikingProps,
		currentState: IWithLikingState,
	) {
		const likePostFailed = !!nextProps.errors.find(
			(error) => error.type === ActionTypes.LIKE_POST || error.type === ActionTypes.UNLIKE_POST,
		);

		if (likePostFailed !== currentState.likePostFailed) {
			return {
				likePostFailed: true,
			};
		}

		return null;
	}

	public state = {
		optLikedByCurrentUser: this.props.likedByCurrentUser,
		likeDisabled: false,
		likePostFailed: false,
		recentLikes: {
			name:
				this.props.likes.length > 0 ? this.props.likes[this.props.likes.length - 1].userName : null,
			total: this.props.likes.length,
		},
		heartAnimation: false,
	};

	private componentIsMounted: boolean = false;
	private animationProgress = new Animated.Value(0);

	private actions: {
		likePost: (input: { postId: string }) => void;
		unlikePost: (input: { postId: string }) => void;
		setNavigationParams: (input: any) => void;
	} = {
		likePost: () => undefined,
		unlikePost: () => undefined,
		setNavigationParams: () => undefined,
	};

	public componentDidMount() {
		this.componentIsMounted = true;
	}

	public componentWillUnmount() {
		this.componentIsMounted = false;
	}

	public render() {
		return (
			<WithI18n>
				{({ getText }) => (
					<WithNavigationParams>
						{({ setNavigationParams }) => (
							<WithPosts>
								{({ likePost, unlikePost }) => {
									this.actions = {
										likePost,
										unlikePost,
										setNavigationParams,
									};

									return this.props.children({
										data: {
											optLikedByCurrentUser: this.state.optLikedByCurrentUser,
											likeDisabled: this.state.likeDisabled,
											recentLikes: this.state.recentLikes,
											animationProgress: this.animationProgress,
											heartAnimation: this.state.heartAnimation,
										},
										actions: {
											onLikePost: this.onLikePostHandler,
											onDoubleTapLikePost: this.onDoubleTapLikeHandler,
											onViewLikes: this.onViewLikesHandler,
											getText,
										},
									});
								}}
							</WithPosts>
						)}
					</WithNavigationParams>
				)}
			</WithI18n>
		);
	}

	private onLikePostHandler = async (postId: string) => {
		const { currentUserName, likes } = this.props;
		const {
			optLikedByCurrentUser,
			likePostFailed,
			recentLikes: { total },
		} = this.state;
		const shouldLike = !optLikedByCurrentUser;

		this.setState((currentState) => ({
			likeDisabled: true,
			optLikedByCurrentUser: !currentState.optLikedByCurrentUser,
		}));

		if (shouldLike) {
			this.setState((currentState) => ({
				likePostFailed: false,
				recentLikes: {
					name: total === 0 ? currentUserName : currentState.recentLikes.name,
					total: currentState.recentLikes.total + 1,
				},
			}));
		} else {
			if (total === 1) {
				this.setState({
					likePostFailed: false,
					recentLikes: {
						name: null,
						total: 0,
					},
				});
			} else if (total > 1) {
				this.setState((currentState) => ({
					likePostFailed: false,
					recentLikes: {
						name: likes[likes.length - 1].userName,
						total: currentState.recentLikes.total - 1,
					},
				}));
			}
		}

		if (shouldLike) {
			await this.actions.likePost({ postId });
		} else {
			await this.actions.unlikePost({ postId });
		}

		if (this.componentIsMounted) {
			if (likePostFailed) {
				this.setState((currentState) => ({
					likeDisabled: false,
					optLikedByCurrentUser: !currentState.optLikedByCurrentUser,
					recentLikes: {
						name: likes.length > 0 ? likes[likes.length - 1].userName : null,
						total: likes.length,
					},
				}));
			} else {
				this.setState({ likeDisabled: false });
			}
		}
	};

	private onDoubleTapLikeHandler = async (postId: string) => {
		const { currentUserName } = this.props;
		const {
			optLikedByCurrentUser,
			recentLikes: { total },
		} = this.state;
		const shouldLike = !optLikedByCurrentUser;

		if (shouldLike) {
			this.setState((currentState) => ({
				optLikedByCurrentUser: !currentState.optLikedByCurrentUser,
				likeDisabled: true,
				likePostFailed: false,
				recentLikes: {
					name: total === 0 ? currentUserName : currentState.recentLikes.name,
					total: currentState.recentLikes.total + 1,
				},
				heartAnimation: true,
			}));

			Animated.timing(this.animationProgress, {
				toValue: 1,
				duration: 1000,
				easing: Easing.linear,
			}).start(() => {
				this.animationProgress.setValue(0);
				this.setState({ heartAnimation: false });
			});

			await this.actions.likePost({ postId });

			this.setState({ likeDisabled: false });
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

	private onViewLikesHandler = () => {
		const likes = this.props.likes.filter((like) => like.userName !== this.props.currentUserName);

		this.actions.setNavigationParams({
			screenName: SCREENS.Likes,
			params: { likes },
		});
		this.props.navigation.navigate(SCREENS.Likes);
	};
}
