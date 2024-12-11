import { useMemo } from 'react';

export default function Logo({ className = 'h-16 w-auto' }: { className?: string }) {
  const viewBoxWidth = 1000;
  const viewBoxHeight = 400;

  const textStyles = useMemo(() => ({
    mainText: {
      fontSize: 100, // Texte principal plus grand
      x: 50,
      y: 200,
    },
    subText: {
      fontSize: 50, // Texte secondaire plus lisible
      x: 50,
      y: 280,
    },
    trademark: {
      fontSize: 40, // Taille ajustée pour le symbole de marque
      dx: 10,
      dy: -60,
    },
  }), []);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ backgroundColor: 'white' }}
    >
      <rect width="100%" height="100%" fill="white" />
      <text
        x={textStyles.mainText.x}
        y={textStyles.mainText.y}
        fontFamily="Arial, sans-serif"
        fontSize={textStyles.mainText.fontSize}
        fontWeight="bold"
        style={{
          dominantBaseline: 'middle',
          textAnchor: 'start',
        }}
      >
        <tspan fill="#4B0082">Dev</tspan>
        <tspan fill="#FF4500" dx="10">Forever</tspan>
        <tspan fill="black" dx="10">.tech</tspan>
      </text>
      <text
        x={textStyles.mainText.x + 700}
        y={textStyles.mainText.y}
        fontFamily="Arial, sans-serif"
        fontSize={textStyles.trademark.fontSize}
        fill="black"
        style={{
          dominantBaseline: 'middle',
          textAnchor: 'start',
        }}
      >
        ®
      </text>
      <text
        x={textStyles.subText.x}
        y={textStyles.subText.y}
        fontFamily="Arial, sans-serif"
        fontSize={textStyles.subText.fontSize}
        fill="gray"
        style={{
          textAnchor: 'start',
        }}
      >
        Transforming IT Excellence
      </text>
    </svg>
  );
}
