import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import {
	ISetUploadProgressAction,
	ISetUploadProgressInput,
	setUploadProgress,
} from '../../../store/storage/files';
import { IThunkDispatch } from '../../../store/types';

interface IDataProps {
	uploadProgress: {
		[hash: string]: number;
	};
}

interface IActionProps {
	setUploadProgress: (setUploadProgressInput: ISetUploadProgressInput) => void;
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

const selectUploadProgress = createSelector(
	(state: IApplicationState) => state.storage.files.uploadProgress,
	(uploadProgress) => uploadProgress,
);

const mapStateToProps = (state: IApplicationState) => ({
	uploadProgress: selectUploadProgress(state),
});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
	setUploadProgress: (setUploadProgressInput: ISetUploadProgressInput) =>
		dispatch(setUploadProgress(setUploadProgressInput)),
});

export const WithFiles: ConnectedComponentClass<
	JSX.Element,
	IChildren
> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer as any) as any;
