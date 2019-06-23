import { useEffect } from 'react';

const useLifecycles = (mount: any, unmount?: any) => {
	useEffect(() => {
		if (mount) {
			mount();
		}
		return () => {
			if (unmount) {
				unmount();
			}
		};
	}, []);
};

export default useLifecycles;
