-- CREATE DATABASE
CREATE DATABASE "musicLessonsDB" WITH OWNER = postgres ENCODING = 'UTF8' CONNECTION
LIMIT
    = -1;

-- CREATE TABLES
CREATE TABLE users (
    email VARCHAR (255) PRIMARY KEY UNIQUE NOT NULL,
    password VARCHAR (50) NOT NULL
);

COMMENT ON TABLE users IS 'Store users of Music Lessons App';

CREATE TABLE lessons (
    id_lesson serial PRIMARY KEY,
    title VARCHAR (50) UNIQUE NOT NULL,
    description VARCHAR (255) NOT NULL
);

COMMENT ON TABLE lessons IS 'Store lessons in Music Lessons App ';

CREATE TABLE states (
    id_state INT PRIMARY KEY,
    state_name VARCHAR (50) UNIQUE NOT NULL
);

COMMENT ON TABLE states IS 'Store lesson states in Music Lessons App ';

CREATE TABLE users_lessons (
    id_user_lessons serial UNIQUE,
    email VARCHAR (255) NOT NULL,
    id_lesson INT NOT NULL,
    id_state INT NOT NULL DEFAULT 1,
    PRIMARY KEY (email, id_lesson),
    FOREIGN KEY (email) REFERENCES users (email),
    FOREIGN KEY (id_lesson) REFERENCES lessons (id_lesson),
    FOREIGN KEY (id_state) REFERENCES states (id_state)
);

COMMENT ON TABLE users_lessons IS 'Store association between users and lessons in Music Lessons App ';

CREATE TABLE notes (
    id_note serial PRIMARY KEY,
    note VARCHAR (255) NOT NULL,
    id_user_lessons INT NOT NULL,
    FOREIGN KEY (id_user_lessons) REFERENCES users_lessons (id_user_lessons)
);

COMMENT ON TABLE notes IS 'Store notes about lessons in Music Lessons App ';

-- INSERT USERS
INSERT INTO
    users (email, password)
VALUES
    (
        'info@yahoo.com',
        '123456'
    );

INSERT INTO
    users (email, password)
VALUES
    (
        'mailto@gmail.com',
        '123456'
    );

INSERT INTO
    users (email, password)
VALUES
    (
        'talent@music.co',
        '123456'
    );

-- INSERT LESSONS
INSERT INTO
    lessons (title, description)
VALUES
    (
        'Bass lessons for beginners',
        'Introduction to Bass'
    );

INSERT INTO
    lessons (title, description)
VALUES
    (
        'Classic Guitar: Advanced',
        'Master Class of Classic Guitar'
    );

INSERT INTO
    lessons (title, description)
VALUES
    (
        'Drums guide for beginners',
        'First steps to play Drums'
    );

INSERT INTO
    lessons (title, description)
VALUES
    (
        'Guitar Basics',
        'How to play guitar chords'
    );

INSERT INTO
    lessons (title, description)
VALUES
    (
        'Jazz improvisation',
        'Bass improvisation'
    );

-- INSERT STATES
INSERT INTO
    states (id_state, state_name)
VALUES
    (1, 'Pending');

INSERT INTO
    states (id_state, state_name)
VALUES
    (2, 'In Review');

INSERT INTO
    states (id_state, state_name)
VALUES
    (3, 'Completed');

-- INSERT USERS_LESSONS
INSERT INTO
    users_lessons (email, id_lesson, id_state)
VALUES
    (
        'info@yahoo.com',
        1,
        1
    );

INSERT INTO
    users_lessons (email, id_lesson, id_state)
VALUES
    (
        'mailto@gmail.com',
        2,
        2
    );

INSERT INTO
    users_lessons (email, id_lesson, id_state)
VALUES
    (
        'talent@music.co',
        3,
        1
    );

INSERT INTO
    users_lessons (email, id_lesson, id_state)
VALUES
    (
        'mailto@gmail.com',
        3,
        3
    );

INSERT INTO
    users_lessons (email, id_lesson, id_state)
VALUES
    (
        'talent@music.co',
        1,
        3
    );