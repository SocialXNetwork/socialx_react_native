import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import {
	ISetUploadStatusAction,
	ISetUploadStatusInput,
	IUploadFileInput,
	setUploadStatus,
	uploadFile,
} from '../../../store/storage/files';
import { IThunkDispatch } from '../../../store/types';

interface IDataProps {
	uploads: {
		[uploadId: string]: {
			progress: number;
			aborting: boolean;
			done: boolean;
		};
	};
}

interface IActionProps {
	uploadFile: (uploadFileInput: IUploadFileInput) => void;
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

const selectUploadStatus = createSelector(
	(state: IApplicationState) => state.storage.files.uploads,
	(uploads) => uploads,
);

const mapStateToProps = (state: IApplicationState) => ({
	uploads: selectUploadStatus(state),
});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
	uploadFile: (uploadFileInput: IUploadFileInput) =>
		dispatch(uploadFile(uploadFileInput)),
});

export const WithFiles: ConnectedComponentClass<
	JSX.Element,
	IChildren
> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer as any) as any;
