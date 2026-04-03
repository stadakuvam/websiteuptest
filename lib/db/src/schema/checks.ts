import { pgTable, serial, text, boolean, timestamp, real, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const checksTable = pgTable("checks", {
  id: serial("id").primaryKey(),
  target: text("target").notNull(),
  isUp: boolean("is_up").notNull(),
  avgResponseTime: real("avg_response_time"),
  checkedAt: timestamp("checked_at").defaultNow().notNull(),
});

export const locationResultsTable = pgTable("location_results", {
  id: serial("id").primaryKey(),
  checkId: integer("check_id").notNull().references(() => checksTable.id, { onDelete: "cascade" }),
  location: text("location").notNull(),
  status: text("status").notNull(),
  responseTime: real("response_time").notNull(),
  statusCode: integer("status_code"),
});

export const insertCheckSchema = createInsertSchema(checksTable).omit({ id: true, checkedAt: true });
export type InsertCheck = z.infer<typeof insertCheckSchema>;
export type Check = typeof checksTable.$inferSelect;
export type LocationResult = typeof locationResultsTable.$inferSelect;
