declare module 'gun';

declare module 'gun/gun';

declare module 'es6-promisify' {
	type ReturnType<P, R> = (p: P) => Promise<R>;
	export function promisify<R, P = {}>(fn: any): ReturnType<P, R>;
}
