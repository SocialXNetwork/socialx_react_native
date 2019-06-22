import { useMemo } from 'react';

const createMemo = (fn: any) => (...args: any[]) => useMemo(() => fn(...args), args);

export default createMemo;
