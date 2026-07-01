import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Compel — Performance-Based Funnels for Coaches';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0B0B0B',
          backgroundImage:
            'radial-gradient(circle at 50% 50%, #0A1205 0%, #0B0B0B 70%)',
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 40,
          }}
        >
          <span
            style={{
              fontSize: 36,
              fontWeight: 300,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
            }}
          >
            com
          </span>
          <span
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
            }}
          >
            pel
          </span>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: '#C8F135',
              marginLeft: 4,
              marginTop: 14,
            }}
          />
        </div>

        {/* Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: '#F0EFE9',
              textAlign: 'center',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            Performance-Based Funnels
          </span>
          <span
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: '#F0EFE9',
              textAlign: 'center',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            for Coaches
          </span>
        </div>

        {/* Subline */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginTop: 32,
          }}
        >
          <span
            style={{
              fontSize: 24,
              color: '#C8F135',
              fontWeight: 600,
            }}
          >
            $0 Upfront
          </span>
          <span style={{ fontSize: 24, color: '#555' }}>—</span>
          <span
            style={{
              fontSize: 24,
              color: '#999',
              fontWeight: 400,
            }}
          >
            Pay Only When You Win
          </span>
        </div>

        {/* Bottom badge */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 20px',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 100,
          }}
        >
          <span style={{ fontSize: 14, color: '#C8F135' }}>✦</span>
          <span
            style={{
              fontSize: 12,
              color: '#999',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            getcompel.co
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
