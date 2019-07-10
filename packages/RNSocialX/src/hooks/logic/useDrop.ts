import * as React from 'react';
import useRefMounted from './useRefMounted';

const { useState, useMemo, useCallback, useEffect } = React;

export interface IDropAreaState {
	over: boolean;
}

export interface IDropAreaBond {
	onDragOver: React.DragEventHandler;
	onDragEnter: React.DragEventHandler;
	onDragLeave: React.DragEventHandler;
	onDrop: React.DragEventHandler;
	onPaste: React.ClipboardEventHandler;
}

export interface IDropAreaOptions {
	onFiles?: (files: File[], event?: any) => void;
	onText?: (text: string, event?: any) => void;
	onUri?: (url: string, event?: any) => void;
}

const noop = () => undefined;
/* 
const defaultState: DropAreaState = {
  over: false,
}; 
*/

const createProcess = (options: IDropAreaOptions, mounted: React.RefObject<boolean>) => (
	dataTransfer: DataTransfer,
	event: any,
) => {
	const uri = dataTransfer.getData('text/uri-list');

	if (uri) {
		(options.onUri || noop)(uri, event);
		return;
	}

	if (dataTransfer.files && dataTransfer.files.length) {
		(options.onFiles || noop)(Array.from(dataTransfer.files), event);
		return;
	}

	if (dataTransfer.items && dataTransfer.items.length) {
		dataTransfer.items[0].getAsString((text) => {
			if (mounted.current) {
				(options.onText || noop)(text, event);
			}
		});
	}
};

const useDrop = (options: IDropAreaOptions = {}, args = []): IDropAreaState => {
	const { onFiles, onText, onUri } = options;
	const mounted = useRefMounted();
	const [over, setOverRaw] = useState<boolean>(false);
	const setOver = useCallback(setOverRaw, []);
	const process = useMemo(() => createProcess(options, mounted), [onFiles, onText, onUri]);

	useEffect(() => {
		const onDragOver = (event: any) => {
			event.preventDefault();
			setOver(true);
		};

		const onDragEnter = (event: any) => {
			event.preventDefault();
			setOver(true);
		};

		const onDragLeave = () => {
			setOver(false);
		};

		const onDragExit = () => {
			setOver(false);
		};

		const onDrop = (event: any) => {
			event.preventDefault();
			setOver(false);
			process(event.dataTransfer, event);
		};

		const onPaste = (event: any) => {
			process(event.clipboardData, event);
		};

		document.addEventListener('dragover', onDragOver);
		document.addEventListener('dragenter', onDragEnter);
		document.addEventListener('dragleave', onDragLeave);
		document.addEventListener('dragexit', onDragExit);
		document.addEventListener('drop', onDrop);
		if (onText) {
			document.addEventListener('paste', onPaste);
		}

		return () => {
			document.removeEventListener('dragover', onDragOver);
			document.removeEventListener('dragenter', onDragEnter);
			document.removeEventListener('dragleave', onDragLeave);
			document.removeEventListener('dragexit', onDragExit);
			document.removeEventListener('drop', onDrop);
			document.removeEventListener('paste', onPaste);
		};
	}, [process, ...args]);

	return { over };
};

export default useDrop;
