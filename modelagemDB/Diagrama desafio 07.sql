CREATE TABLE "user" (
  "id" int PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "email" varchar,
  "created_at" timestamp,
  "update_at" timestamp
);

CREATE TABLE "game" (
  "id" int PRIMARY KEY,
  "title" varchar,
  "created_at" timestamp,
  "update_at" timestamp
);

CREATE TABLE "user_game_game" (
  "user_id" int,
  "game_id" int,
  PRIMARY KEY ("user_id", "game_id")
);

CREATE TABLE "order" (
  "id" int PRIMARY KEY,
  "user_id" int
);

CREATE TABLE "order_item" (
  "id" int PRIMARY KEY,
  "order_id" int,
  "amount" int
);

CREATE TABLE "game_genre" (
  "game_id" int,
  "genre_id" int,
  PRIMARY KEY ("game_id", "genre_id")
);

CREATE TABLE "genre" (
  "id" int PRIMARY KEY,
  "description" varchar
);

ALTER TABLE "user_game_game" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "order_item" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("id");

ALTER TABLE "user_game_game" ADD FOREIGN KEY ("game_id") REFERENCES "game" ("id");

ALTER TABLE "game_genre" ADD FOREIGN KEY ("game_id") REFERENCES "game" ("id");

ALTER TABLE "game_genre" ADD FOREIGN KEY ("genre_id") REFERENCES "genre" ("id");

