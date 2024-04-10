import { Book } from "../db/books";

type ListOfBooksProps = {
  books: Array<Book>;
};

export function ListOfBooks({ books }: ListOfBooksProps) {
  return (
    <ul id="list-books">
      {books.map((book) => (
        <li class="grid grid-cols-2">
          <div>
            <h1 class="text-3xl font-semibold">{book.title}</h1>

            {book.isbn10 ? (
              <img
                src={`https://covers.openlibrary.org/b/isbn/${book.isbn10}-M.jpg`}
              />
            ) : null}
            <div class="author flex gap-x-2 mt-4">
              {book.authors.map((author) => {
                return <a href={`/authors/${author.id}`}>{author.name}</a>;
              })}
              <br />
            </div>
          </div>
          <div class="">
            <button
              hx-post={`/api/upvote/${book.id}`}
              hx-target="#list-books"
              class="rounded h-auto bg-red-100"
            >
              Upvote {book.upvotes ?? 0}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
