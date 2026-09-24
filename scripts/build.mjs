import { spawnSync } from "node:child_process";
import { rmSync } from "node:fs";
import { fileURLToPath } from "node:url";

const isVercel = process.env.VERCEL === "1" || process.env.VERCEL === "true";

if (isVercel) {
  rmSync(".next", { recursive: true, force: true });
  rmSync("dist", { recursive: true, force: true });
}

const command = isVercel
  ? ["corepack", ["pnpm", "exec", "next", "build"]]
  : ["node", [fileURLToPath(new URL("./run-framework.mjs", import.meta.url)), "build"]];

const result = spawnSync(command[0], command[1], { stdio: "inherit" });
if (result.error) throw result.error;
process.exit(result.status ?? 1);
