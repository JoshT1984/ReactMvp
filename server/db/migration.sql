DROP TABLE IF EXISTS Gameboard CASCADE;
DROP TABLE IF EXISTS UI_Features CASCADE;
DROP TABLE IF EXISTS Player CASCADE;

CREATE TABLE Gameboard(
    game_id SERIAL NOT NULL PRIMARY KEY,
    Width INTEGER NOT NULL,
    Height INTEGER NOT NULL
);

CREATE TABLE UI_Features(
    id INTEGER NOT NULL PRIMARY KEY,
    BG_Color VARCHAR(255) NOT NULL,
    Text_Color VARCHAR(255) NOT NULL,
    Width INTEGER NOT NULL,
    Height INTEGER NOT NULL,
    game_id INTEGER UNIQUE NOT NULL,
    CONSTRAINT ui_features_game_id_foreign FOREIGN KEY(game_id) REFERENCES Gameboard(game_id)
);

CREATE TABLE Player(
    id INTEGER NOT NULL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    score INTEGER NOT NULL,
    game_id INTEGER UNIQUE NOT NULL,
    CONSTRAINT player_game_id_foreign FOREIGN KEY(game_id) REFERENCES Gameboard(game_id)
);