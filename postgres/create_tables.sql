
CREATE TABLE categories
(
  id       int  NOT NULL,
  title    char NOT NULL,
  group_id int ,
  PRIMARY KEY (id)
);

COMMENT ON COLUMN categories.group_id IS 'If null then global';

CREATE TABLE group_members
(
  group_id    int     NOT NULL,
  firebase_id char    NOT NULL,
  is_admin    boolean NOT NULL DEFAULT false,
  role_id     int    ,
  score       int    ,
  PRIMARY KEY (group_id, firebase_id)
);

CREATE TABLE group_tasks
(
  group_id int,
  task_id  int
);

CREATE TABLE groups
(
  id          int   NOT NULL,
  name        char  NOT NULL,
  description char ,
  image       bytea,
  PRIMARY KEY (id)
);

CREATE TABLE member_roles
(
  id   int  NOT NULL,
  role char NOT NULL,
  PRIMARY KEY (id)
);

COMMENT ON COLUMN member_roles.role IS 'dad,mom...';

CREATE TABLE repeat_types
(
  id   int  NOT NULL,
  type char NOT NULL,
  PRIMARY KEY (id)
);

COMMENT ON TABLE repeat_types IS 'enum';

COMMENT ON COLUMN repeat_types.type IS 'hourly, daily, weekly';

CREATE TABLE task_templates
(
  id          int  NOT NULL,
  title       char NOT NULL,
  description char,
  category_id int  NOT NULL,
  group_id    int ,
  PRIMARY KEY (id)
);

COMMENT ON COLUMN task_templates.group_id IS 'If null then global';

CREATE TABLE tasks
(
  id              int     NOT NULL,
  title           char    NOT NULL,
  description     char   ,
  category_id     int    ,
  due_date        date   ,
  done            boolean NOT NULL,
  repeat          int     NOT NULL,
  end_repeat      date   ,
  urgent          boolean NOT NULL,
  snooze_interval int    ,
  score           int    ,
  PRIMARY KEY (id)
);

CREATE TABLE user_tasks
(
  assignee_id char,
  task_id     int 
);

CREATE TABLE users
(
  firebase_id  char  NOT NULL,
  display_name char  NOT NULL,
  email        char  NOT NULL,
  birth_date   date  NOT NULL,
  image        bytea,
  PRIMARY KEY (firebase_id)
);

CREATE TABLE weekly_badges
(
  winner_id char,
  group_id  int ,
  date      date,
  score     int 
);
