import {
  useCallback,
  useRef,
} from 'react';

const useDebounceValidate = (validateFn, delay = 300) => {
  const timerRef = useRef(null);
  const pendingResolveRef = useRef(null);
  const validateFnRef = useRef(validateFn);
  validateFnRef.current = validateFn;

  return useCallback((value) => new Promise((resolve) => {
    if (pendingResolveRef.current) {
      pendingResolveRef.current(undefined);
    }

    pendingResolveRef.current = resolve;
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      pendingResolveRef.current = null;
      validateFnRef.current(value).then(resolve);
    }, delay);
  }), [delay]);
};

export default useDebounceValidate;
