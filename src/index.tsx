import { Hono } from "hono";
import { Layout } from "./views/Layout";
import { authorsList, booksList } from "./db/books";
import { ListOfBooks } from "./views/ListOfBooks";
import { AuthorPage } from "./views/AuthorPage";
import { getDb } from "./db";
import { authors, books, booksToAuthors } from "./db/schema";
import { eq, sql } from "drizzle-orm";

const app = new Hono<{ Bindings: Bindings }>();

type Bindings = {
  DB: D1Database;
};

app.get("*", Layout);

app.get("/", async (c) => {
  return c.render(<div>Howdy there</div>);
});

app.get("/books", async (c) => {
  const db = getDb(c.env.DB);

  const books = db.query.books.findMany({
    with: {
      booksToAuthors: {
        with: {
          author: true,
        },
      },
    },
    orderBy: (books, { desc }) => [desc(books.upvotes)],
  });
  console.log("books:", books.toSQL());

  const result = await books;
  console.log("result:", JSON.stringify(result, null, 4));

  return c.render(<ListOfBooks books={result} />);
});

app.get("/authors/:id", async (c) => {
  const authorId = parseInt(c.req.param("id"));
  const db = getDb(c.env.DB);

  const authorDetails = await db.query.authors.findFirst({
    where: (author, { eq }) => eq(author.id, authorId),
    with: {
      booksToAuthors: {
        with: {
          book: true,
        },
      },
    },
  });

  return c.render(<AuthorPage authorWithBooks={authorDetails} />);
});

app.post("/api/upvote/:id", async (c) => {
  const bookId = parseInt(c.req.param("id"));
  const db = getDb(c.env.DB);

  await db
    .update(books)
    .set({ upvotes: sql`${books.upvotes} + 1` })
    .where(eq(books.id, bookId));

  const result = await db.query.books.findMany({
    with: {
      booksToAuthors: {
        with: {
          author: true,
        },
      },
    },
    orderBy: (books, { desc }) => [desc(books.upvotes)],
  });

  return c.render(<ListOfBooks books={result} />);
});

app.get("/seed", async (c) => {
  const db = getDb(c.env.DB);

  await db.transaction(async (tx) => {
    // seed books
    await tx.insert(books).values(booksList).onConflictDoNothing();
    // seed authors
    await tx.insert(authors).values(authorsList).onConflictDoNothing();
    // seed join table data
    await tx
      .insert(booksToAuthors)
      .values(
        booksList.flatMap((book) =>
          book.authors.map((author) => ({
            bookId: book.id,
            authorId: author.id,
          })),
        ),
      )
      .onConflictDoNothing();
  });
});

export default app;
