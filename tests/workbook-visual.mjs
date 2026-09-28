import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const input = process.argv[2];
if (!input) throw new Error("Pass a workbook path");
const wb = await SpreadsheetFile.importXlsx(await FileBlob.load(input));
const dir = path.join(os.tmpdir(), "strength-coach-workbook-previews");
await fs.mkdir(dir, { recursive: true });
for (const [name, range] of [["Overview", "A1:B17"], ["Program", "A1:I10"], ["Training Log", "A1:J9"]]) {
  const preview = await wb.render({ sheetName: name, range, scale: 1.25, format: "png" });
  await fs.writeFile(path.join(dir, `${name.replace(/ /g, "-")}.png`), new Uint8Array(await preview.arrayBuffer()));
}
console.log(`Workbook previews: ${dir}`);
