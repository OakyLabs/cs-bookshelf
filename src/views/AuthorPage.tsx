import { InferResultType } from "../db/types";

type AuthorWithBooks =
  | InferResultType<"authors", { booksToAuthors: { with: { book: true } } }>
  | undefined;

export function AuthorPage({
  authorWithBooks,
}: {
  authorWithBooks: AuthorWithBooks;
}) {
  if (!authorWithBooks) {
    return <p>Author not found</p>;
  }

  return (
    <div>
      <h2>Name: {authorWithBooks.name}</h2>
      <h3>Books published:</h3>
      <div class="book-grid">
        {authorWithBooks.booksToAuthors.map(({ book }) => {
          return (
            <article>
              {book.linkToAmazon && (
                <img class="h-80" src={book.linkToAmazon} />
              )}
              <p>{book.title}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
