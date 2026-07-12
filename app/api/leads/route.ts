import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate basic fields
    if (!data.name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // Prepare lead data
    const lead = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      ...data,
    };

    // Define the path for the JSON file (e.g., in the data folder)
    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "leads.json");

    // Ensure the data directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Read existing leads or create a new array
    let leads = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      leads = fileContent ? JSON.parse(fileContent) : [];
    }

    // Add the new lead and save
    leads.push(lead);
    fs.writeFileSync(filePath, JSON.stringify(leads, null, 2), "utf-8");

    console.log("New lead saved:", lead);

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    console.error("Error saving lead:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
