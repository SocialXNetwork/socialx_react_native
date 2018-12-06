import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';

import {
	createComment,
	ICreateCommentInput,
	ILikeCommentInput,
	IRemoveCommentInput,
	likeComment,
	removeComment,
	unlikeComment,
} from '../../../store/data/comments';

import { IThunkDispatch } from '../../../store/types';

interface IDataProps {}

interface IActionProps {
	createComment: (createCommentInput: ICreateCommentInput) => void;
	removeComment: (removeCommentInput: IRemoveCommentInput) => void;
	likeComment: (likeCommentInput: ILikeCommentInput) => void;
	unlikeComment: (unlikeCommentInput: ILikeCommentInput) => void;
}

type IProps = IDataProps & IActionProps;

interface IChildren {
	children: (props: IProps) => JSX.Element;
}

class Enhancer extends React.Component<IProps & IChildren> {
	render() {
		const { children, ...props } = this.props;
		return children(props);
	}
}

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
	createComment: (createCommentInput: ICreateCommentInput) =>
		dispatch(createComment(createCommentInput)),
	removeComment: (removeCommentInput: IRemoveCommentInput) =>
		dispatch(removeComment(removeCommentInput)),
	likeComment: (likeCommentInput: ILikeCommentInput) => dispatch(likeComment(likeCommentInput)),
	unlikeComment: (unlikeCommentInput: ILikeCommentInput) =>
		dispatch(unlikeComment(unlikeCommentInput)),
});

export const WithComments: ConnectedComponentClass<JSX.Element, IChildren> = connect(
	null,
	mapDispatchToProps,
)(Enhancer as any) as any;
