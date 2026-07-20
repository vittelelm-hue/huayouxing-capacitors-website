"use client";

import {
  type MouseEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";

type ClickSparkProps = {
  children: ReactNode;
  className?: string;
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: "linear" | "ease-in" | "ease-in-out" | "ease-out";
  extraScale?: number;
};

type Spark = {
  angle: number;
  startTime: number;
  x: number;
  y: number;
};

const ease = (progress: number, easing: NonNullable<ClickSparkProps["easing"]>) => {
  switch (easing) {
    case "linear":
      return progress;
    case "ease-in":
      return progress * progress;
    case "ease-in-out":
      return progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;
    default:
      return progress * (2 - progress);
  }
};

export default function ClickSpark({
  children,
  className = "",
  sparkColor = "#087c86",
  sparkSize = 16,
  sparkRadius = 32,
  sparkCount = 10,
  duration = 520,
  easing = "ease-out",
  extraScale = 1,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const frameRef = useRef<number | null>(null);
  const sizeRef = useRef({ height: 0, width: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;

    if (!canvas || !parent) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const resizeCanvas = () => {
      const { height, width } = parent.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const nextWidth = Math.max(1, Math.round(width * pixelRatio));
      const nextHeight = Math.max(1, Math.round(height * pixelRatio));

      if (canvas.width === nextWidth && canvas.height === nextHeight) {
        return;
      }

      canvas.width = nextWidth;
      canvas.height = nextHeight;
      sizeRef.current = { height, width };
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(parent);
    resizeCanvas();

    return () => observer.disconnect();
  }, []);

  const draw = useCallback(
    function drawSparks(timestamp: number) {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");

      if (!canvas || !context) {
        frameRef.current = null;
        return;
      }

      const { height, width } = sizeRef.current;
      context.clearRect(0, 0, width, height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) {
          return false;
        }

        const eased = ease(elapsed / duration, easing);
        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);
        const cos = Math.cos(spark.angle);
        const sin = Math.sin(spark.angle);

        context.globalAlpha = 1 - eased;
        context.lineCap = "round";
        context.strokeStyle = sparkColor;
        context.lineWidth = 2.5;
        context.shadowBlur = 8;
        context.shadowColor = sparkColor;
        context.beginPath();
        context.moveTo(spark.x + distance * cos, spark.y + distance * sin);
        context.lineTo(
          spark.x + (distance + lineLength) * cos,
          spark.y + (distance + lineLength) * sin,
        );
        context.stroke();

        return true;
      });

      context.globalAlpha = 1;
      context.shadowBlur = 0;

      if (sparksRef.current.length > 0) {
        frameRef.current = requestAnimationFrame(drawSparks);
      } else {
        frameRef.current = null;
      }
    },
    [duration, easing, extraScale, sparkColor, sparkRadius, sparkSize],
  );

  useEffect(
    () => () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    },
    [],
  );

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const now = performance.now();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    sparksRef.current.push(
      ...Array.from({ length: sparkCount }, (_, index) => ({
        angle: (2 * Math.PI * index) / sparkCount,
        startTime: now,
        x,
        y,
      })),
    );

    if (frameRef.current === null) {
      frameRef.current = requestAnimationFrame(draw);
    }
  };

  return (
    <div className={`click-spark ${className}`.trim()} onClick={handleClick}>
      <canvas aria-hidden="true" className="click-spark-canvas" ref={canvasRef} />
      {children}
    </div>
  );
}
