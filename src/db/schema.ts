import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const books = sqliteTable("books", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  linkToAmazon: text("linkToAmazon"),
  year: integer("year").notNull(),
  upvotes: integer("upvotes").default(0).notNull(),
  editions: integer("editions").notNull(),
  isbn10: text("isbn10").notNull(),
});

export const booksRelations = relations(books, ({ many }) => ({
  booksToAuthors: many(booksToAuthors),
}));

export const authors = sqliteTable("authors", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
});

export const authorsRelations = relations(authors, ({ many }) => ({
  booksToAuthors: many(booksToAuthors),
}));

export const booksToAuthors = sqliteTable("books_to_authors", {
  authorId: integer("author_id")
    .notNull()
    .references(() => authors.id),
  bookId: integer("book_id")
    .notNull()
    .references(() => books.id),
});

export const booksToAuthorsRelations = relations(booksToAuthors, ({ one }) => ({
  author: one(authors, {
    fields: [booksToAuthors.authorId],
    references: [authors.id],
  }),
  book: one(books, {
    fields: [booksToAuthors.bookId],
    references: [books.id],
  }),
}));
