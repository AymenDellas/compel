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
    
    if (!data.name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // --- NOTION INTEGRATION ---
    if (notion && databaseId) {
      const properties: any = {
        "Name": { title: [{ text: { content: data.name } }] },
        "Email": { email: data.email || "" },
        "Source": { rich_text: [{ text: { content: data.source || "website" } }] },
      };

      if (data.url) {
        properties["URL"] = { url: data.url };
      }
      if (data.calls) {
        properties["Monthly Calls"] = { number: parseInt(data.calls, 10) || 0 };
      }

      await notion.pages.create({
        parent: { database_id: databaseId },
        properties,
      });

      console.log("New lead saved to Notion:", data.name);
      return NextResponse.json({ success: true }, { status: 201 });
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

    console.log("New lead saved to local JSON (Notion not configured):", lead);
    return NextResponse.json({ success: true, lead }, { status: 201 });

  } catch (error) {
    console.error("Error saving lead:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
