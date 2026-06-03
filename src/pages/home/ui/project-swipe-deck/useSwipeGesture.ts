import { useCallback, useRef, useState } from "react";

type SwipeDirection = "left" | "right";

type UseSwipeGestureOptions = {
    onSwipe: (direction: SwipeDirection) => void;
    threshold?: number;
};

export const useSwipeGesture = ({
    onSwipe,
    threshold = 110,
}: UseSwipeGestureOptions) => {
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const startRef = useRef({ x: 0, y: 0 });
    const activePointerRef = useRef<number | null>(null);

    const completeSwipe = useCallback(
        (direction: SwipeDirection) => {
            setIsExiting(true);
            const exitX =
                direction === "right"
                    ? window.innerWidth * 1.1
                    : -window.innerWidth * 1.1;

            setOffset((current) => ({ x: exitX, y: current.y }));

            window.setTimeout(() => {
                onSwipe(direction);
                setOffset({ x: 0, y: 0 });
                setIsExiting(false);
                setIsDragging(false);
                activePointerRef.current = null;
            }, 280);
        },
        [onSwipe],
    );

    const handlePointerDown = useCallback(
        (event: React.PointerEvent<HTMLElement>) => {
            if (isExiting) {
                return;
            }

            activePointerRef.current = event.pointerId;
            event.currentTarget.setPointerCapture(event.pointerId);
            startRef.current = {
                x: event.clientX - offset.x,
                y: event.clientY - offset.y,
            };
            setIsDragging(true);
        },
        [isExiting, offset.x, offset.y],
    );

    const handlePointerMove = useCallback(
        (event: React.PointerEvent<HTMLElement>) => {
            if (
                !isDragging ||
                isExiting ||
                activePointerRef.current !== event.pointerId
            ) {
                return;
            }

            setOffset({
                x: event.clientX - startRef.current.x,
                y: (event.clientY - startRef.current.y) * 0.25,
            });
        },
        [isDragging, isExiting],
    );

    const handlePointerEnd = useCallback(() => {
        if (!isDragging || isExiting) {
            return;
        }

        setIsDragging(false);
        activePointerRef.current = null;

        if (offset.x > threshold) {
            completeSwipe("right");
            return;
        }

        if (offset.x < -threshold) {
            completeSwipe("left");
            return;
        }

        setOffset({ x: 0, y: 0 });
    }, [completeSwipe, isDragging, isExiting, offset.x, threshold]);

    const swipe = useCallback(
        (direction: SwipeDirection) => {
            if (isExiting) {
                return;
            }

            completeSwipe(direction);
        },
        [completeSwipe, isExiting],
    );

    const rotation = Math.max(-18, Math.min(18, offset.x * 0.06));
    const likeOpacity = Math.min(1, Math.max(0, offset.x / threshold));
    const skipOpacity = Math.min(1, Math.max(0, -offset.x / threshold));

    return {
        offset,
        isDragging,
        isExiting,
        rotation,
        likeOpacity,
        skipOpacity,
        swipe,
        handlers: {
            onPointerDown: handlePointerDown,
            onPointerMove: handlePointerMove,
            onPointerUp: handlePointerEnd,
            onPointerCancel: handlePointerEnd,
            onLostPointerCapture: handlePointerEnd,
        },
    };
};
