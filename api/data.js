
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "src", "utils", "data.json");

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(fileContent);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to read data.json", error });
  }
}
