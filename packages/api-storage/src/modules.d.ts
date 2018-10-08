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