import { useCallback } from "react";

type FN = (...args: any[]) => any;

export function awaitableThrottle (fn: FN, ms: number) {
  let busy: boolean;

  return (...args: any[]): Promise<any> =>
    new Promise((resolve) => {
      if (busy) return;

      busy = true;

      window.setTimeout(function () {
        resolve(fn.call(null, ...args));
        busy = false;
      }, ms);
    });
}

export function useThrottle<F extends FN>(
  fn: F,
  delay: number,
  deps: any[] = []
) {
  return useCallback(awaitableThrottle(fn, delay), deps);
}

const keyIs =
  (key: string): Function =>
  (code: string): boolean =>
    code === key;

export const isArrowDown = keyIs("ArrowDown");
export const isArrowUp = keyIs("ArrowUp");
export const isEnter = keyIs("Enter");

export const getCircularIndex = (idx: number, cap: number = 1) => {
  return (cap + idx) % cap;
};

export const openURL = (url: string, target: string = "_blank") => {
  window.open(url, target);
}