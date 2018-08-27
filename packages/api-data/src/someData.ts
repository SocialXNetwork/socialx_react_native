// Here, data is mutated due to gun api so we need to create a throwaway context to
// return a shallow clone.
// gun should be provided as an injected dependency, so the app should be responsible
// for creating a wrapper that provides something like withGun(withSomeData(data))
export const someData = (gun: any, data: object) => gun.get('someData').sync(data);
