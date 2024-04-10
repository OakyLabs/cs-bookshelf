import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export function getDb(client: D1Database) {
  return drizzle(client, { schema });
}
