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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
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

    return NextResponse.json({ success: true, lead }, { status: 201 });

  } catch (error: any) {
    console.error("Error saving lead:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
