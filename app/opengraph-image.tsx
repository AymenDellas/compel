import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';
export const alt = "Compel. Your reputation brings them here. Give them a clear way to book.";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const [sans, serif] = await Promise.all([readFile(path.join(process.cwd(), 'app/fonts/Manrope-Medium.ttf')), readFile(path.join(process.cwd(), 'app/fonts/InstrumentSerif-Italic.ttf'))]);
  return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '70px 85px', backgroundColor: '#121510', backgroundImage: 'linear-gradient(135deg, #263813 0%, #121510 45%)', fontFamily: 'Manrope', color: '#f2f5eb' }}><div style={{ display: 'flex', alignItems: 'baseline', position: 'absolute', top: 55, left: 85, fontSize: 37, fontWeight: 600, letterSpacing: '-2px' }}>compel<span style={{ color: '#b1ff00' }}>.</span></div><div style={{ display: 'flex', fontSize: 17, color: '#f2f5eb', letterSpacing: '1px', marginTop: 30 }}>FOR ESTABLISHED COACHING BUSINESSES</div><div style={{ display: 'flex', marginTop: 28, fontSize: 61, letterSpacing: '-3px', lineHeight: 1.15 }}>Your reputation brings them here.</div><div style={{ display: 'flex', fontFamily: 'Instrument', fontStyle: 'italic', fontSize: 76, color: '#b1ff00', letterSpacing: '-2px' }}>Give them a clear way to book.</div><div style={{ display: 'flex', gap: 15, marginTop: 38, fontSize: 18, color: '#f2f5eb' }}>What happens between interest and a coaching conversation.</div><div style={{ display: 'flex', position: 'absolute', bottom: 45, right: 60, color: '#f2f5eb', fontSize: 15 }}>getcompel.co</div></div>, { ...size, fonts: [{ name: 'Manrope', data: sans, style: 'normal', weight: 500 }, { name: 'Instrument', data: serif, style: 'italic', weight: 400 }] });
}
