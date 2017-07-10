
.open generation/v2/db/songs.db
DROP TABLE IF EXISTS songs;
CREATE TABLE songs(
  composer TEXT,
  title TEXT,
  key TEXT,
  measures TEXT,
  PRIMARY KEY (composer, title)
);