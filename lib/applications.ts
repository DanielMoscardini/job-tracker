import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type { Application } from "@/types/application";

const DATA_FILE = path.join(process.cwd(), "data", "applications.json");
