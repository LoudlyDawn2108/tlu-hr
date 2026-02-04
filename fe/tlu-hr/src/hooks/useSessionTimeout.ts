import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_TIMEOUT_MS = 30 * 60 * 1000;
const DEFAULT_WARNING_MS = 29 * 60 * 1000;

interface SessionTimeoutOptions {
  timeoutMs?: number;
  warningMs?: number;
  onTimeout: () => void;
  enabled?: boolean;
}

export function useSessionTimeout({
  timeoutMs = DEFAULT_TIMEOUT_MS,
  warningMs = DEFAULT_WARNING_MS,
  onTimeout,
  enabled = true,
}: SessionTimeoutOptions) {
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(
    Math.ceil((timeoutMs - warningMs) / 1000)
  );

  const warningTimeoutRef = useRef<number | null>(null);
  const logoutTimeoutRef = useRef<number | null>(null);
  const countdownIntervalRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (warningTimeoutRef.current) {
      window.clearTimeout(warningTimeoutRef.current);
      warningTimeoutRef.current = null;
    }
    if (logoutTimeoutRef.current) {
      window.clearTimeout(logoutTimeoutRef.current);
      logoutTimeoutRef.current = null;
    }
    if (countdownIntervalRef.current) {
      window.clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  }, []);

  const startCountdown = useCallback(() => {
    const warningDurationMs = Math.max(timeoutMs - warningMs, 0);
    const initialSeconds = Math.ceil(warningDurationMs / 1000);
    setRemainingSeconds(initialSeconds);
    if (countdownIntervalRef.current) {
      window.clearInterval(countdownIntervalRef.current);
    }
    countdownIntervalRef.current = window.setInterval(() => {
      setRemainingSeconds((prev) => Math.max(prev - 1, 0));
    }, 1000);
  }, [timeoutMs, warningMs]);

  const resetTimer = useCallback(() => {
    setIsWarningVisible(false);
    clearTimers();

    warningTimeoutRef.current = window.setTimeout(() => {
      setIsWarningVisible(true);
      startCountdown();
    }, warningMs);

    logoutTimeoutRef.current = window.setTimeout(() => {
      setIsWarningVisible(false);
      onTimeout();
    }, timeoutMs);
  }, [clearTimers, onTimeout, startCountdown, timeoutMs, warningMs]);

  useEffect(() => {
    if (!enabled) {
      setIsWarningVisible(false);
      clearTimers();
      return undefined;
    }

    resetTimer();

    const handleActivity = () => resetTimer();
    const events: (keyof WindowEventMap)[] = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    events.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      clearTimers();
    };
  }, [clearTimers, enabled, resetTimer]);

  return {
    isWarningVisible,
    remainingSeconds,
    resetTimer,
  };
}
