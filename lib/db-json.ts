import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data/invites.json");

export async function getInviteByNames(bride: string, groom: string) {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    const invites = JSON.parse(data);

    return invites.find(
      (inv: any) =>
        inv.slug.toLowerCase() === `${bride}-${groom}`.toLowerCase(),
    );
  } catch (error) {
    console.error("Error reading database:", error);
    return null;
  }
}
