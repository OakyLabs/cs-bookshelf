import { html } from "hono/html";
import { jsxRenderer } from "hono/jsx-renderer";

export const Layout = jsxRenderer(({ children }) => {
  return html`
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://unpkg.com/htmx.org@1.9.3"></script>
        <script src="https://unpkg.com/hyperscript.org@0.9.9"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <title>The CS Bookshelf</title>
      </head>
      <body>
        <nav class="flex space-x-4 mb-4">
          <a href="/">Home</a>
          <a href="/books">See list</a>
        </nav>
        ${children}
      </body>
    </html>
  `;
});
