import { Author, Book } from "../db/books";

type AuthorPageProps = {
  author: Author;
  books: Array<Book>;
};

export function AuthorPage({ author, books }: AuthorPageProps) {
  return (
    <div>
      <h2>Name: {author.name}</h2>
      <h3>Books published:</h3>
      <div class="book-grid">
        {books.map((book) => {
          return (
            <article>
              <img class="h-80" src={book.image} />
              <p>{book.title}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
