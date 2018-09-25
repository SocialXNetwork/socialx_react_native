declare module 'gun';

declare module 'gun/gun';

declare module 'es6-promisify' {
	type ReturnType<P, R> = P extends object ? (parameters: P) => Promise<R> : () => Promise<R>;
	export function promisify<R, P = null>(fn: any): ReturnType<P, R>;
}
