//src/db/schema.ts

import { pgTable, serial, text, timestamp, varchar, integer, boolean, date, pgEnum } from "drizzle-orm/pg-core";

// Users Table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).unique(),
  password: varchar("password", { length: 255 }),
});

// Projects Table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  userId: integer("user_id").references(() => users.id),
});

// Tasks Table
const priorityEnum = pgEnum("priority", ["low", "medium", "high"]);

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }),
  description: text("description"),
  dueDate: date("due_date"),
  priority: priorityEnum("priority"),
  completed: boolean("completed").default(false),
  projectId: integer("project_id").references(() => projects.id),
  userId: integer("user_id").references(() => users.id),
});