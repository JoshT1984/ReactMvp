DO $$
DECLARE 
    gb_id INTEGER;
BEGIN

INSERT INTO gameboard (width, height) values (800,600) RETURNING game_id INTO gb_id;

INSERT INTO ui_features (id, bg_color, text_color, width, height, game_id) VALUES (1,'#003a49', '#790e66', 700, 40, gb_id);

INSERT INTO player (id, firstname, lastname, score, game_id) VALUES (1, 'Joshua', 'Thompson', 0, gb_id);
END $$;