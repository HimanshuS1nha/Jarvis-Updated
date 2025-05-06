import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const chatsTable = sqliteTable("chats", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull().default("New chat"),
  isTitleGenerated: int().default(0).notNull(),
});

export const messagesTable = sqliteTable("messages", {
  id: int().primaryKey({ autoIncrement: true }),
  by: text("by", { enum: ["model", "user"] }).notNull(),
  content: text("content").notNull(),

  chatId: int()
    .references(() => chatsTable.id, { onDelete: "cascade" })
    .notNull(),
});
