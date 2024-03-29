DROP TABLE IF EXISTS gameboard CASCADE;
DROP TABLE IF EXISTS ui_features CASCADE;
DROP TABLE IF EXISTS player CASCADE;

CREATE TABLE gameboard(
    game_id SERIAL NOT NULL PRIMARY KEY,
    width INTEGER NOT NULL,
    height INTEGER NOT NULL
);

CREATE TABLE ui_Features(
    id INTEGER NOT NULL PRIMARY KEY,
    bg_color VARCHAR(255) NOT NULL,
    text_Color VARCHAR(255) NOT NULL,
    width INTEGER NOT NULL,
    height INTEGER NOT NULL,
    game_id INTEGER 
);

CREATE TABLE player(
    id INTEGER NOT NULL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    score INTEGER NOT NULL,
    game_id INTEGER
);
