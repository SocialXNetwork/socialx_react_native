declare module 'gun';

declare module 'gun/gun';

declare module 'uuid/v4';

declare module process {
    export const env: {
        DEBUG: string;
    };
}