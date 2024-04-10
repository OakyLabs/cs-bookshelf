import { Hono } from "hono";
import { Layout } from "./views/Layout";
import { Author, Book, books, getBooksOrdered } from "./db/books";
import { ListOfBooks } from "./views/ListOfBooks";
import { AuthorPage } from "./views/AuthorPage";
import { getDb } from "./db";
import { authors, books as bookSchema, booksToAuthors } from "./db/schema";
import { eq } from "drizzle-orm";

const app = new Hono<{ Bindings: Bindings }>();

type Bindings = {
  DB: D1Database;
};

app.get("*", Layout);

app.get("/", async (c) => {
  const db = getDb(c.env.DB);
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
  });
  console.log("books:", books.toSQL());

  const result = await books;
  console.log("result:", JSON.stringify(result, null, 4));

  return c.render(<ListOfBooks books={await getBooksOrdered()} />);
});

app.get("/authors/:id", async (c) => {
  const authorId = c.req.param("id");

  let authorData: Author;

  const allBooksByAuthor = books.filter((book) =>
    book.authors.some((author) => {
      if (author.id === +authorId) {
        if (!authorData) {
          authorData = author;
        }

        return true;
      }

      return false;
    })
  );

  return c.render(<AuthorPage author={authorData!} books={allBooksByAuthor} />);
});

app.post("/api/upvote/:id", async (c) => {
  const bookId = c.req.param("id");

  const bookInfo = books.find((book) => book.id === +bookId);
  if (bookInfo?.upvotes) {
    bookInfo.upvotes += 1;
  } else {
    // bookInfo?.upvotes = 1;
  }
  console.log("bookInfo:", bookInfo);

  return c.render(<ListOfBooks books={await getBooksOrdered()} />);
});

app.get("/seed", async (c) => {
  const db = getDb(c.env.DB);

  // console.log("HERE?");
  // await db.delete(authors);
  // await db.delete(bookSchema);
  // console.log("KABOOMI");
  let struct: Record<string, Array<Book>> = {};

  for (const book of books) {
    for (const author of book.authors) {
      if (struct[author.name]) {
        struct[author.name].push(book);
      } else {
        struct[author.name] = [book];
      }
    }
  }

  // console.log("struct:", struct);
  const booksMap = new Map<string, number>();
  const booksRecord: Record<string, number> = {};

  for (const [authorName, books] of Object.entries(struct)) {
    const authorExistsQuery = db
      .select({ id: authors.id, name: authors.name })
      .from(authors)
      .where(eq(authors.name, authorName));

    console.log("Author exist query: ", authorExistsQuery.toSQL());

    let [authorExists] = await authorExistsQuery;

    if (!authorExists) {
      console.log("creating author");
      const newAuthorQuery = db
        .insert(authors)
        .values({ name: authorName })
        .returning({ id: authors.id, name: authors.name });

      console.log("NEW AUTHOR", newAuthorQuery.toSQL());

      const [newAuthor] = await newAuthorQuery;

      authorExists = newAuthor;
      // console.log("newAuthor:", newAuthor);
    }

    for (const book of books) {
      const inMap = booksMap.get(book.title);
      // const inMap = booksRecord[book.title];

      if (!inMap) {
        const bookExistsQuery = db
          .select({ id: bookSchema.id, title: bookSchema.title })
          .from(bookSchema)
          .where(eq(bookSchema.title, book.title));

        console.log("QUERY:", bookExistsQuery.toSQL().sql);

        const [bookExists] = await bookExistsQuery;

        if (bookExists) {
          // booksRecord[bookExists.title] = bookExists.id;
          booksMap.set(bookExists.title, bookExists.id);
          console.log(booksMap.get(bookExists.title));
        } else {
          const newBookQuery = db
            .insert(bookSchema)
            .values({
              editions: book.editions,
              title: book.title,
              isbn10: book.isbn10,
              year: book.year,
              linkToAmazon: book.linkToAmazon,
            })
            .returning({ title: bookSchema.title, id: bookSchema.id });

          console.log("NEW BOOK: -", newBookQuery.toSQL());

          const [newBook] = await newBookQuery;
          console.log("newBook:", newBook);

          booksMap.set(newBook.title, newBook.id);
        }
      }

      console.log(
        "KABOOM: ",
        {
          authorId: authorExists.id,
          bookId: booksMap.get(book.title)!,
          title: book.title,
          map: booksMap,
          data: booksMap.get(book.title),
        },
        "\n\n\n"
      );

      const intermediaryTableQuery = db.insert(booksToAuthors).values({
        authorId: authorExists.id,
        bookId: booksMap.get(book.title)!,
      });

      console.log("INTERMEDIARY QUERY: ", intermediaryTableQuery.toSQL());

      await intermediaryTableQuery;
    }
  }

  const allBooksQuery = db
    .select()
    .from(bookSchema)
    .leftJoin(booksToAuthors, eq(bookSchema.id, booksToAuthors))
    .leftJoin(authors, eq(booksToAuthors.authorId, authors.id));

  console.log("ALL QUERY: ", allBooksQuery.toSQL());

  console.log("result: ", await allBooksQuery);

  return c.json(true);
});

export default app;
