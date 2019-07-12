import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import { IUploadFileInput, uploadFile } from '../../../store/storage/files';

const selectUploadStatus = createSelector(
	(state: IApplicationState) => state.storage.files.uploads,
	(uploads) => uploads,
);

export const useFilesData = () => ({
	uploads: useSelector(selectUploadStatus),
});

export const useFilesActions = () => {
	const dispatch = useDispatch();

	return {
		uploadFile: (uploadFileInput: IUploadFileInput) => dispatch(uploadFile(uploadFileInput)),
	};
};
