// ai-excited-01 entry: write the whale image to the output directory.
//
// The image is an asset in this repository (image.png). This program copies
// it to $MAKEFUN_OUTPUT_DIR/entry.png, byte for byte, so the two graded
// runs of the program produce identical output.
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "image.png");
if (!existsSync(source)) {
  throw new Error(`image asset not found: ${source}`);
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.png");
copyFileSync(source, target);

// Confirm the copy landed: the graded runs must each produce the file,
// and a zero-byte output would fail the gate.
const written = statSync(target);
if (written.size === 0) {
  throw new Error(`entry image is empty: ${target}`);
}
console.log(`wrote ${target} (${written.size} bytes)`);
