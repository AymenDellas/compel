import type { CSSProperties } from 'react';

/** Uses the supplied PNG's alpha silhouette, keeping its lime full stop. */
export default function CompelLogo({ className = '', width = 146, dark = false }: { className?: string; width?: number; dark?: boolean }) {
  const artwork: CSSProperties = {
    position: 'absolute', width: '139.0525%', height: '176.5854%',
    left: '-19.7183%', top: '-43.1707%',
    background: `linear-gradient(90deg, ${dark ? '#141617' : '#f2f4eb'} 81.5%, #a2ff00 81.5%)`,
    maskImage: 'url("/brand/compel-logo.png")', WebkitMaskImage: 'url("/brand/compel-logo.png")',
    maskSize: '100% 100%', WebkitMaskSize: '100% 100%',
    maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat',
  };
  return <span role="img" aria-label="Compel" className={`compel-logo ${className}`} style={{ position: 'relative', display: 'inline-block', width, maxWidth: '100%', aspectRatio: '1562 / 410', overflow: 'hidden', flexShrink: 0, verticalAlign: 'middle' }}><span aria-hidden="true" style={artwork} /></span>;
}
