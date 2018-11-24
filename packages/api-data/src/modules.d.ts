declare module 'gun';

declare module 'gun/gun';

declare module 'gun-flint';

declare module 'uuid/v4';

declare module 'js-base64' {
    export const Base64: any
}

declare module process {
    export const env: {
        DEBUG: string;
    };
}