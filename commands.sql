CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES ('Larry Page', 'https://www.google.com/', 'Google', 29);
INSERT INTO blogs (url, title) VALUES ('https://www.facebook.com/', 'Facebook');