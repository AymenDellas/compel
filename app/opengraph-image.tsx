import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { home } from '@/content/home';

export const runtime = 'nodejs';
export const alt = `Compel. ${home.hero.headline} ${home.hero.payment}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const [sans, serif] = await Promise.all([readFile(path.join(process.cwd(), 'app/fonts/Manrope-Medium.ttf')), readFile(path.join(process.cwd(), 'app/fonts/InstrumentSerif-Italic.ttf'))]);
  return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '70px 85px', backgroundColor: '#121510', backgroundImage: 'linear-gradient(135deg, #263813 0%, #121510 45%)', fontFamily: 'Manrope', color: '#f2f5eb' }}><div style={{ display: 'flex', alignItems: 'baseline', position: 'absolute', top: 55, left: 85, fontSize: 37, fontWeight: 600, letterSpacing: '-2px' }}>compel<span style={{ color: '#b1ff00' }}>.</span></div><div style={{ display: 'flex', marginTop: 28, fontSize: 59, letterSpacing: '-3px', lineHeight: 1.15 }}>{home.hero.headline}</div><div style={{ display: 'flex', fontFamily: 'Instrument', fontStyle: 'italic', fontSize: 68, color: '#b1ff00', letterSpacing: '-2px' }}>{home.hero.payment}</div><div style={{ display: 'flex', marginTop: 38, fontSize: 20 }}>For eligible rebuilds under agreed terms.</div><div style={{ display: 'flex', position: 'absolute', bottom: 45, right: 60, color: '#f2f5eb', fontSize: 15 }}>getcompel.co</div></div>, { ...size, fonts: [{ name: 'Manrope', data: sans, style: 'normal', weight: 500 }, { name: 'Instrument', data: serif, style: 'italic', weight: 400 }] });
}
