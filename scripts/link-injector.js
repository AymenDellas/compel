import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dictionary = {
  "high ticket": "/learn/high-ticket-coaching-funnel",
  "discovery call": "/learn/coaching-discovery-call-script",
  "executive coach": "/coaches/executive-coaching",
  "business coach": "/coaches/business-coaching",
  "life coach": "/coaches/life-coaching",
  "career coach": "/coaches/career-coaching",
  "performance coach": "/coaches/performance-coaching",
  "email sequence": "/learn/coaching-email-nurture-sequence"
};

const articlesDir = path.join(__dirname, '..', 'content', 'articles');

function injectLinks(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    for (const [keyword, url] of Object.entries(dictionary)) {
        const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const escapedKeyword = escapeRegExp(keyword);
        
        const regex = new RegExp(`(\\[.*?\\]\\(.*?\\))|\\b(${escapedKeyword})\\b`, 'gi');
        
        let found = false;
        content = content.replace(regex, (match, p1, p2) => {
            if (p1) {
                return match; 
            }
            if (p2 && !found) {
                found = true;
                modified = true;
                return `[${match}](${url})`; 
            }
            return match; 
        });
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

function processDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.md')) {
            injectLinks(fullPath);
        }
    }
}

if (fs.existsSync(articlesDir)) {
    processDirectory(articlesDir);
    console.log("Internal linking complete.");
} else {
    console.error(`Directory not found: ${articlesDir}`);
}
