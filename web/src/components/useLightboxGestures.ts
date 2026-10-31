"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

const SWIPE_X = 56;
const DISMISS_Y = 96;
const MIN_SCALE = 1;
const MAX_SCALE = 4;
const PINCH_EPS = 0.02;

type Point = { x: number; y: number };

type GestureMode = "none" | "pan" | "swipe" | "pinch";

export type LightboxGestureTransform = {
  scale: number;
  x: number;
  y: number;
  dragging: boolean;
};

type UseLightboxGesturesArgs = {
  surfaceRef: RefObject<HTMLElement | null>;
  enabled: boolean;
  multi: boolean;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
};

function distance(a: Point, b: Point) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

function midpoint(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function touchPoint(touch: Touch): Point {
  return { x: touch.clientX, y: touch.clientY };
}

export function useLightboxGestures({
  surfaceRef,
  enabled,
  multi,
  onPrev,
  onNext,
  onClose,
}: UseLightboxGesturesArgs) {
  const [transform, setTransform] = useState<LightboxGestureTransform>({
    scale: 1,
    x: 0,
    y: 0,
    dragging: false,
  });

  const transformRef = useRef(transform);
  const multiRef = useRef(multi);
  const onPrevRef = useRef(onPrev);
  const onNextRef = useRef(onNext);
  const onCloseRef = useRef(onClose);
  const modeRef = useRef<GestureMode>("none");
  const startRef = useRef<Point | null>(null);
  const originRef = useRef({ scale: 1, x: 0, y: 0 });
  const pinchStartDistRef = useRef(1);
  const pinchMidRef = useRef<Point>({ x: 0, y: 0 });
  const axisLockRef = useRef<"x" | "y" | null>(null);

  useEffect(() => {
    transformRef.current = transform;
  }, [transform]);

  useEffect(() => {
    multiRef.current = multi;
    onPrevRef.current = onPrev;
    onNextRef.current = onNext;
    onCloseRef.current = onClose;
  }, [multi, onClose, onNext, onPrev]);

  const resetZoom = useCallback(() => {
    modeRef.current = "none";
    startRef.current = null;
    axisLockRef.current = null;
    setTransform({ scale: 1, x: 0, y: 0, dragging: false });
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const surface = surfaceRef.current;
    if (!surface) return;

    function onTouchStart(event: TouchEvent) {
      const touches = event.touches;
      if (touches.length === 2) {
        event.preventDefault();
        const a = touchPoint(touches[0]);
        const b = touchPoint(touches[1]);
        modeRef.current = "pinch";
        pinchStartDistRef.current = Math.max(distance(a, b), 1);
        pinchMidRef.current = midpoint(a, b);
        originRef.current = {
          scale: transformRef.current.scale,
          x: transformRef.current.x,
          y: transformRef.current.y,
        };
        setTransform((prev) => ({ ...prev, dragging: true }));
        return;
      }

      if (touches.length !== 1) return;

      const point = touchPoint(touches[0]);
      startRef.current = point;
      axisLockRef.current = null;
      originRef.current = {
        scale: transformRef.current.scale,
        x: transformRef.current.x,
        y: transformRef.current.y,
      };

      if (transformRef.current.scale > MIN_SCALE + PINCH_EPS) {
        modeRef.current = "pan";
        setTransform((prev) => ({ ...prev, dragging: true }));
      } else {
        modeRef.current = "swipe";
      }
    }

    function onTouchMove(event: TouchEvent) {
      const touches = event.touches;
      const mode = modeRef.current;

      if (mode === "pinch" && touches.length === 2) {
        event.preventDefault();
        const a = touchPoint(touches[0]);
        const b = touchPoint(touches[1]);
        const dist = Math.max(distance(a, b), 1);
        const mid = midpoint(a, b);
        const nextScale = Math.min(
          MAX_SCALE,
          Math.max(
            MIN_SCALE,
            originRef.current.scale * (dist / pinchStartDistRef.current),
          ),
        );
        const midDelta = {
          x: mid.x - pinchMidRef.current.x,
          y: mid.y - pinchMidRef.current.y,
        };
        const scaleRatio =
          nextScale / Math.max(originRef.current.scale, MIN_SCALE);
        const nextX =
          nextScale <= MIN_SCALE + PINCH_EPS
            ? 0
            : originRef.current.x * scaleRatio + midDelta.x;
        const nextY =
          nextScale <= MIN_SCALE + PINCH_EPS
            ? 0
            : originRef.current.y * scaleRatio + midDelta.y;

        setTransform({
          scale: nextScale,
          x: nextX,
          y: nextY,
          dragging: true,
        });
        return;
      }

      if (touches.length !== 1 || !startRef.current) return;

      const point = touchPoint(touches[0]);
      const dx = point.x - startRef.current.x;
      const dy = point.y - startRef.current.y;

      if (mode === "pan") {
        event.preventDefault();
        setTransform({
          scale: originRef.current.scale,
          x: originRef.current.x + dx,
          y: originRef.current.y + dy,
          dragging: true,
        });
        return;
      }

      if (mode !== "swipe") return;

      if (!axisLockRef.current) {
        if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
        axisLockRef.current = Math.abs(dx) >= Math.abs(dy) ? "x" : "y";
        setTransform((prev) => ({ ...prev, dragging: true }));
      }

      event.preventDefault();

      if (axisLockRef.current === "x") {
        if (!multiRef.current) {
          setTransform({ scale: 1, x: 0, y: 0, dragging: true });
          return;
        }
        setTransform({
          scale: 1,
          x: dx,
          y: 0,
          dragging: true,
        });
        return;
      }

      const dismissY = Math.max(dy, dy < 0 ? dy * 0.2 : 0);
      setTransform({
        scale: 1,
        x: 0,
        y: dismissY,
        dragging: true,
      });
    }

    function onTouchEnd(event: TouchEvent) {
      const mode = modeRef.current;
      const current = transformRef.current;

      if (event.touches.length >= 2) return;

      if (event.touches.length === 1 && mode === "pinch") {
        startRef.current = touchPoint(event.touches[0]);
        originRef.current = {
          scale: current.scale,
          x: current.x,
          y: current.y,
        };
        modeRef.current =
          current.scale > MIN_SCALE + PINCH_EPS ? "pan" : "swipe";
        return;
      }

      if (mode === "pinch") {
        if (current.scale <= MIN_SCALE + PINCH_EPS) {
          modeRef.current = "none";
          startRef.current = null;
          axisLockRef.current = null;
          setTransform({ scale: 1, x: 0, y: 0, dragging: false });
        } else {
          setTransform({
            scale: current.scale,
            x: current.x,
            y: current.y,
            dragging: false,
          });
          modeRef.current = "none";
          startRef.current = null;
        }
        return;
      }

      if (mode === "pan") {
        setTransform({
          scale: current.scale,
          x: current.x,
          y: current.y,
          dragging: false,
        });
        modeRef.current = "none";
        startRef.current = null;
        return;
      }

      if (mode === "swipe" && startRef.current) {
        const axis = axisLockRef.current;
        const dx = current.x;
        const dy = current.y;

        if (axis === "y" && dy >= DISMISS_Y) {
          modeRef.current = "none";
          startRef.current = null;
          axisLockRef.current = null;
          setTransform({ scale: 1, x: 0, y: 0, dragging: false });
          onCloseRef.current();
          return;
        }

        if (axis === "x" && multiRef.current) {
          if (dx <= -SWIPE_X) {
            modeRef.current = "none";
            startRef.current = null;
            axisLockRef.current = null;
            setTransform({ scale: 1, x: 0, y: 0, dragging: false });
            onNextRef.current();
            return;
          }
          if (dx >= SWIPE_X) {
            modeRef.current = "none";
            startRef.current = null;
            axisLockRef.current = null;
            setTransform({ scale: 1, x: 0, y: 0, dragging: false });
            onPrevRef.current();
            return;
          }
        }
      }

      modeRef.current = "none";
      startRef.current = null;
      axisLockRef.current = null;
      setTransform({ scale: 1, x: 0, y: 0, dragging: false });
    }

    function onTouchCancel() {
      modeRef.current = "none";
      startRef.current = null;
      axisLockRef.current = null;
      setTransform({ scale: 1, x: 0, y: 0, dragging: false });
    }

    surface.addEventListener("touchstart", onTouchStart, { passive: false });
    surface.addEventListener("touchmove", onTouchMove, { passive: false });
    surface.addEventListener("touchend", onTouchEnd);
    surface.addEventListener("touchcancel", onTouchCancel);

    return () => {
      surface.removeEventListener("touchstart", onTouchStart);
      surface.removeEventListener("touchmove", onTouchMove);
      surface.removeEventListener("touchend", onTouchEnd);
      surface.removeEventListener("touchcancel", onTouchCancel);
    };
  }, [enabled, surfaceRef]);

  const backdropOpacity =
    transform.scale > MIN_SCALE + PINCH_EPS
      ? 1
      : Math.max(0.35, 1 - Math.abs(transform.y) / 280);

  return {
    transform,
    backdropOpacity,
    resetZoom,
  };
}
