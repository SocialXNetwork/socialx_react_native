declare module 'gun';

declare module 'gun/gun';

declare module 'es6-promisify' {
	type ReturnType<T> = () => Promise<T>;
	export function promisify<T>(fn: any): ReturnType<T>;
}
