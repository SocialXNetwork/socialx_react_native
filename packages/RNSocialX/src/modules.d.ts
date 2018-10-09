declare module 'hex-rgb' {
	export default function(color: string): {red: string; green: string; blue: string};
}

declare module 'react-native-swipeable';

declare module 'react-native-spinkit';

declare module 'react-native-android-keyboard-adjust';

declare module 'react-native-modal-dropdown';

declare module 'react-native-smart-splash-screen';

declare module 'react-native-svg-charts';

declare module 'react-native-app-intro-slider';

declare module 'react-native-country-picker-modal';

// declare module 'react-native-image-crop-picker';

// declare module 'react-native-image-resizer';

declare module 'react-native-mime-types';

// declare module 'native-base';

declare module '*.json' {
	const value: any;
	export default value;
}

// background upload package
declare module 'react-native-background-upload' {
    export interface IUploadOpts {
        url: string;
        path: string;
        method: string;
        type: string;
        headers?: {
            [key: string]: string;
        };
        field?: string;
        // Below are options only supported on Android
        notification?: {
            enabled: boolean
        };
    }
    export interface IUploadResult {
        responseCode: number;
        responseBody: any;
    }
    export interface IGetFileInfo {
        name: string;
        exists: string;
        size: number;
        extension: string;
        mimeType: string;
    }
    export interface IListenerBase {
        id: string;
    }
    export interface IListenerProgess extends IListenerBase {
        progress: number;
    }
    export interface IListenerError extends IListenerBase {
        error: string;
    }
    export interface IListenerCompleted extends IListenerBase, IUploadResult {}
    interface IUploader {
        startUpload: (options: IUploadOpts) => Promise<string>;
        getFileInfo: (path: string) => Promise<IGetFileInfo>;
        cancelUpload: (uploadId: string) => Promise<boolean>;
        addListener: (
            eventType: string, 
            uploadId: string, 
            listener: (data: any) => void
            ) => void;
    }
    const Upload: IUploader;
    export default Upload;
}