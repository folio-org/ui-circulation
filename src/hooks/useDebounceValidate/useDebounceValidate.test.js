import {
  renderHook,
  act,
} from '@folio/jest-config-stripes/testing-library/react';

import useDebounceValidate from './useDebounceValidate';

describe('useDebounceValidate', () => {
  let validateFn;

  beforeEach(() => {
    jest.useFakeTimers();
    validateFn = jest.fn(() => Promise.resolve());
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return the same function reference across re-renders', () => {
    const { result, rerender } = renderHook(() => useDebounceValidate(validateFn));
    const firstRef = result.current;

    rerender();

    expect(result.current).toBe(firstRef);
  });

  it('should return a new function reference when delay changes', () => {
    const { result, rerender } = renderHook(({ delay }) => useDebounceValidate(validateFn, delay), {
      initialProps: { delay: 300 },
    });
    const firstRef = result.current;

    rerender({ delay: 500 });

    expect(result.current).not.toBe(firstRef);
  });

  it('should return a Promise', () => {
    const { result } = renderHook(() => useDebounceValidate(validateFn));

    expect(result.current('test')).toBeInstanceOf(Promise);
  });

  it('should not call validateFn before the delay', () => {
    const { result } = renderHook(() => useDebounceValidate(validateFn));

    act(() => { result.current('test'); });

    expect(validateFn).not.toHaveBeenCalled();
  });

  it('should call validateFn with the value after the delay', () => {
    const { result } = renderHook(() => useDebounceValidate(validateFn));

    act(() => {
      result.current('test');
      jest.runAllTimers();
    });

    expect(validateFn).toHaveBeenCalledWith('test');
  });

  it('should call validateFn only once with the last value when called rapidly', () => {
    const { result } = renderHook(() => useDebounceValidate(validateFn));

    act(() => {
      result.current('a');
      result.current('ab');
      result.current('abc');
      jest.runAllTimers();
    });

    expect(validateFn).toHaveBeenCalledTimes(1);
    expect(validateFn).toHaveBeenCalledWith('abc');
  });

  it('should resolve previous pending promises with undefined when a new call arrives', async () => {
    const { result } = renderHook(() => useDebounceValidate(validateFn));
    let firstPromise;

    act(() => { firstPromise = result.current('a'); });
    act(() => { result.current('ab'); });

    await expect(firstPromise).resolves.toBeUndefined();
  });

  it('should resolve with the value returned by validateFn', async () => {
    const error = 'Name already exists';
    validateFn.mockResolvedValue(error);
    const { result } = renderHook(() => useDebounceValidate(validateFn));
    let promise;

    act(() => {
      promise = result.current('test');
      jest.runAllTimers();
    });

    await expect(promise).resolves.toBe(error);
  });

  it('should respect a custom delay', () => {
    const { result } = renderHook(() => useDebounceValidate(validateFn, 500));

    act(() => { result.current('test'); });

    jest.advanceTimersByTime(499);
    expect(validateFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(validateFn).toHaveBeenCalledWith('test');
  });

  it('should always use the latest validateFn without changing the function reference', () => {
    const firstFn = jest.fn(() => Promise.resolve());
    const secondFn = jest.fn(() => Promise.resolve());

    const { result, rerender } = renderHook(({ fn }) => useDebounceValidate(fn), {
      initialProps: { fn: firstFn },
    });
    const stableRef = result.current;

    rerender({ fn: secondFn });

    act(() => {
      result.current('test');
      jest.runAllTimers();
    });

    expect(result.current).toBe(stableRef);
    expect(firstFn).not.toHaveBeenCalled();
    expect(secondFn).toHaveBeenCalledWith('test');
  });
});
