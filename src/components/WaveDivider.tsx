type Variant = "wave1" | "wave2" | "wave3";

const paths: Record<Variant, string> = {
  wave1: "M0,64 C320,120 640,0 960,64 C1280,128 1600,16 1920,64 L1920,160 L0,160Z",
  wave2: "M0,96 C240,40 480,140 720,96 C960,52 1200,140 1440,96 C1680,52 1920,100 1920,96 L1920,160 L0,160Z",
  wave3: "M0,80 C160,130 320,30 480,80 C640,130 800,30 960,80 C1120,130 1280,30 1440,80 C1600,130 1760,30 1920,80 L1920,160 L0,160Z",
};

export default function WaveDivider({
  variant = "wave1",
  flip = false,
  color = "var(--color-surface)",
  className = "",
}: {
  variant?: Variant;
  flip?: boolean;
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden leading-none pointer-events-none ${className}`}
      style={{
        marginTop: flip ? undefined : "-1px",
        marginBottom: flip ? "-1px" : undefined,
      }}
    >
      <svg
        className="block w-full h-[50px] sm:h-[70px]"
        viewBox="0 0 1920 160"
        preserveAspectRatio="none"
        style={{ transform: flip ? "rotate(180deg)" : undefined }}
      >
        <path d={paths[variant]} fill={color} />
      </svg>
    </div>
  );
}
