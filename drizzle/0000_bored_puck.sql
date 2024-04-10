CREATE TABLE `authors` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `books` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`linkToAmazon` text,
	`year` integer NOT NULL,
	`upvotes` integer DEFAULT 0 NOT NULL,
	`editions` integer NOT NULL,
	`isbn10` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `books_to_authors` (
	`author_id` integer NOT NULL,
	`book_id` integer NOT NULL,
	FOREIGN KEY (`author_id`) REFERENCES `authors`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`book_id`) REFERENCES `books`(`id`) ON UPDATE no action ON DELETE no action
);
