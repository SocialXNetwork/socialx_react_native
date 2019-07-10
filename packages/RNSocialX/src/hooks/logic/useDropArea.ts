import { useMemo, useState } from 'react';
import useRefMounted from './useRefMounted';

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

const createBond = (process: any, setOver: any): IDropAreaBond => ({
	onDragOver: (event) => {
		event.preventDefault();
	},
	onDragEnter: (event) => {
		event.preventDefault();
		setOver(true);
	},
	onDragLeave: () => {
		setOver(false);
	},
	onDrop: (event) => {
		event.preventDefault();
		event.persist();
		setOver(false);
		process(event.dataTransfer, event);
	},
	onPaste: (event) => {
		event.persist();
		process(event.clipboardData, event);
	},
});

const useDropArea = (options: IDropAreaOptions = {}): [IDropAreaBond, IDropAreaState] => {
	const { onFiles, onText, onUri } = options;
	const mounted = useRefMounted();
	const [over, setOver] = useState<boolean>(false);
	const process = useMemo(() => createProcess(options, mounted), [onFiles, onText, onUri]);
	const bond: IDropAreaBond = useMemo(() => createBond(process, setOver), [process, setOver]);

	return [bond, { over }];
};

export default useDropArea;
