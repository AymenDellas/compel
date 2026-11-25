import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Client } from "@notionhq/client";

// Initialize Notion client (will be undefined if keys are missing)
const notion = process.env.NOTION_API_KEY ? new Client({ auth: process.env.NOTION_API_KEY }) : null;
const databaseId = process.env.NOTION_DATABASE_ID;

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const isReview = data.source === 'funnel-review';
    const websiteOnlyReview = isReview && data.name === undefined && data.email === undefined && data.offer === undefined && data.context === undefined;
    let reviewHostname = '';

    if (websiteOnlyReview) {
      try {
        if (typeof data.url !== 'string' || data.url.length > 2000) throw new Error();
        const input = data.url.trim();
        if (!input || /[\s\\\u0000-\u001f\u007f]/.test(input)) throw new Error();
        const website = new URL(/^[a-z][a-z\d+.-]*:\/\//i.test(input) ? input : `https://${input}`);
        if (!['https:', 'http:'].includes(website.protocol) || !website.hostname.includes('.') || website.username || website.password || website.href.length > 2000) throw new Error();
        data.url = website.href;
        reviewHostname = website.hostname;
      } catch {
        return NextResponse.json({ error: 'Enter a website address such as yourpractice.com.' }, { status: 400 });
      }
    } else if (isReview) {
      if (typeof data.name !== 'string' || !data.name.trim() || data.name.length > 150 || typeof data.email !== 'string' || data.email.length > 254) {
        return NextResponse.json({ error: 'Please provide your name and email.' }, { status: 400 });
      }
      try {
        const website = new URL(data.url);
        if (!['https:', 'http:'].includes(website.protocol) || data.url.length > 2000) throw new Error('Invalid website');
      } catch {
        return NextResponse.json({ error: 'Please provide a valid website URL.' }, { status: 400 });
      }
      if (typeof data.offer !== 'string' || !data.offer.trim() || data.offer.length > 2000 || (data.context !== undefined && (typeof data.context !== 'string' || data.context.length > 2000))) {
        return NextResponse.json({ error: 'Please describe your coaching offer in up to 2,000 characters.' }, { status: 400 });
      }
    }
    
    if (!websiteOnlyReview && !data.name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!websiteOnlyReview && (!data.email || !emailRegex.test(data.email))) {
      return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
    }

    // --- NOTION INTEGRATION ---
    if (notion && databaseId) {
      const properties: any = {
        "Name": { title: [{ text: { content: websiteOnlyReview ? reviewHostname : data.name } }] },
        "Source": { rich_text: [{ text: { content: data.source || "website" } }] },
      };

      if (!websiteOnlyReview) {
        properties["Email"] = { email: data.email };
      }
      if (data.url) {
        properties["URL"] = { url: data.url };
      }
      if (data.calls) {
        properties["Monthly Calls"] = { number: parseInt(data.calls, 10) || 0 };
      }

      await notion.pages.create({
        parent: { database_id: databaseId },
        properties,
        // Page content avoids requiring new columns in the existing Notion database.
        ...(isReview && !websiteOnlyReview ? {
          children: [
            { object: 'block' as const, paragraph: { rich_text: [{ type: 'text' as const, text: { content: 'Coaching offer and clients: ' } }, { type: 'text' as const, text: { content: data.offer } }] } },
            ...(data.context ? [{ object: 'block' as const, paragraph: { rich_text: [{ type: 'text' as const, text: { content: 'Existing interest and baseline: ' } }, { type: 'text' as const, text: { content: data.context } }] } }] : []),
          ],
        } : {}),
      });

      return NextResponse.json({ success: true }, { status: 201 });
    }

    if (process.env.NODE_ENV === "production") {
      console.error("Notion API not configured or missing keys in production.");
      return NextResponse.json({ error: "Notion integration is not configured." }, { status: 500 });
    }

    // --- FALLBACK: LOCAL JSON (Dev only) ---
    const lead = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      ...data,
    };

    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "leads.json");

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let leads = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      leads = fileContent ? JSON.parse(fileContent) : [];
    }

    leads.push(lead);
    fs.writeFileSync(filePath, JSON.stringify(leads, null, 2), "utf-8");

    return NextResponse.json(websiteOnlyReview ? { success: true } : { success: true, lead }, { status: 201 });

  } catch (error: any) {
    console.error("Error saving lead:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
