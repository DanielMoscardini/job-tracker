import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type { Application } from "@/types/application";

const DATA_FILE = path.join(process.cwd(), "data", "applications.json");

const readAll = async (): Promise<Application[]> => {
  try {
    const text = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(text);
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
};

const writeAll = async (items: Application[]): Promise<void> => {
  await mkdir(path.dirname(DATA_FILE), { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(items, null, 2), "utf-8");
};

export const list = async (): Promise<Application[]> => {
  return await readAll();
};
