const fs = require('fs');
const path = require('path');

const generateLogos = () => {
    const width = 300;
    const height = 100;
    
    // Shared SVG header and style
    const getSvgHeader = (bgFill) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;700&amp;display=swap');
      .font-light { font-family: 'Outfit', sans-serif; font-weight: 100; font-size: 72px; letter-spacing: -0.02em; }
      .font-bold { font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 72px; letter-spacing: -0.02em; }
    </style>
  </defs>
  ${bgFill !== 'transparent' ? `<rect width="100%" height="100%" fill="${bgFill}"/>` : ''}
`;

    // Create SVGs
    // To make the dot perfectly circular regardless of the font rendering, we use a raw <circle> element.
    const createSvg = (comFill, pelFill, bgFill = 'transparent') => {
        return getSvgHeader(bgFill) + `
  <text x="47%" y="50%" dominant-baseline="central" text-anchor="middle">
    <tspan class="font-light" fill="${comFill}">com</tspan><tspan class="font-bold" fill="${pelFill}">pel</tspan>
  </text>
  <circle cx="254" cy="62" r="8" fill="#C8F135" />
</svg>`;
    };

    // --- LOGOMARK GENERATION ---
    const iconSize = 80;
    const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${iconSize} ${iconSize}" width="${iconSize}" height="${iconSize}">
  <rect width="${iconSize}" height="${iconSize}" rx="16" fill="#0A0A0A" />
  <circle cx="28" cy="52" r="10" fill="#FFFFFF" />
  <path d="M 28 52 L 58 22" stroke="#C8F135" stroke-width="12" stroke-linecap="round" />
  <path d="M 44 22 L 58 22 L 58 36" stroke="#C8F135" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none" />
</svg>`;
    
    const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${iconSize} ${iconSize}">
  <rect width="${iconSize}" height="${iconSize}" rx="16" fill="#0A0A0A" />
  <circle cx="28" cy="52" r="12" fill="#FFFFFF" />
  <path d="M 28 52 L 58 22" stroke="#C8F135" stroke-width="14" stroke-linecap="round" />
  <path d="M 40 22 L 58 22 L 58 40" stroke="#C8F135" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" fill="none" />
</svg>`;

    const brandDir = path.join(__dirname, 'public', 'brand');
    if (!fs.existsSync(brandDir)) {
        fs.mkdirSync(brandDir, { recursive: true });
    }

    fs.writeFileSync(path.join(brandDir, 'compel-logo-primary.svg'), createSvg('#FFFFFF', '#FFFFFF'));
    fs.writeFileSync(path.join(brandDir, 'compel-logo-light.svg'), createSvg('#0A0A0A', '#0A0A0A'));
    fs.writeFileSync(path.join(brandDir, 'compel-logo-accent.svg'), createSvg('#FFFFFF', '#C8F135'));
    fs.writeFileSync(path.join(brandDir, 'compel-icon.svg'), iconSvg);
    fs.writeFileSync(path.join(__dirname, 'public', 'favicon.svg'), faviconSvg);

    console.log('Logo pack generated successfully in public/brand/');
};

generateLogos();
