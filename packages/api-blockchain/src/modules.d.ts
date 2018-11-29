declare module '*.json' {
    const value: any;
    export default value;
}

declare module '*v1' {
    const res: {
        chain: Json;
        history: Json;
    };
    export default res;
}

declare module '*api' {
    const res: {
        chain: Json;
        history: Json;
    };
    export default res;
}

declare module 'helpers.ts' {
    const api: any[];
    export default api;
}

declare interface Json {
    value: any;
}

declare module 'camel-case';

declare module 'bip39';

declare module 'eosjs';

declare module 'text-encoding';