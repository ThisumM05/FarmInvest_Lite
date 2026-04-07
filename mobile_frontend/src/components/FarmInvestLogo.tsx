import React from "react";
import Svg, { Path, Circle, Rect, G, Ellipse } from "react-native-svg";

/**
 * FarmInvest brand logo — a minimalist tractor silhouette with a wheat stalk.
 * Renders as pure SVG, no external assets required.
 */
interface Props {
  size?: number;
  color?: string;       // main icon colour
  accentColor?: string; // wheel / highlight colour
}

export default function FarmInvestLogo({
  size = 40,
  color = "#22c55e",
  accentColor = "#16a34a",
}: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* ── Tractor body ── */}
      <Rect x="20" y="26" width="28" height="16" rx="3" fill={color} />

      {/* ── Cab / cabin ── */}
      <Path
        d="M28 26 L28 18 Q28 16 30 16 L40 16 Q42 16 42 18 L42 26 Z"
        fill={accentColor}
      />

      {/* ── Windshield ── */}
      <Path
        d="M30 18 L30 24 L40 24 L40 18 Z"
        fill="#0d1b2a"
        opacity={0.7}
      />

      {/* ── Exhaust stack ── */}
      <Rect x="40" y="12" width="3" height="8" rx="1.5" fill={accentColor} />

      {/* ── Rear large wheel ── */}
      <Circle cx="26" cy="42" r="10" fill={accentColor} />
      <Circle cx="26" cy="42" r="6" fill="#0d1b2a" />
      <Circle cx="26" cy="42" r="2" fill={color} />

      {/* ── Front small wheel ── */}
      <Circle cx="46" cy="43" r="6" fill={accentColor} />
      <Circle cx="46" cy="43" r="3.5" fill="#0d1b2a" />
      <Circle cx="46" cy="43" r="1.5" fill={color} />

      {/* ── Wheat stalk (right side) ── */}
      {/* stem */}
      <Path d="M56 52 L56 34" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* left grain */}
      <Path d="M56 44 Q52 40 53 36" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* right grain */}
      <Path d="M56 40 Q60 36 59 32" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* top grain */}
      <Ellipse cx="56" cy="33" rx="1.5" ry="3" fill={color} />

      {/* ── Ground line ── */}
      <Path
        d="M10 52 L58 52"
        stroke={accentColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.4}
      />
    </Svg>
  );
}
