CREATE DATABASE todobom;
CREATE TABLE categories (
  id integer NOT NULL GENERATED ALWAYS AS IDENTITY (
    INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1
  ),
  title text NOT NULL,
  group_id int,
  PRIMARY KEY (id)
);
COMMENT ON COLUMN categories.group_id IS 'If null then global';
CREATE TABLE group_members (
  group_id int NOT NULL,
  user_id int NOT NULL,
  is_admin boolean NOT NULL DEFAULT false,
  role_id int,
  score int,
  PRIMARY KEY (group_id, user_id)
);
CREATE TABLE group_user_tasks (
  group_id int NOT NULL,
  task_id int NOT NULL,
  user_id int
);
CREATE TABLE groups (
  id integer NOT NULL GENERATED ALWAYS AS IDENTITY (
    INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1
  ),
  name text NOT NULL,
  description text,
  image bytea,
  PRIMARY KEY (id)
);
CREATE TABLE member_roles (
  id integer NOT NULL GENERATED ALWAYS AS IDENTITY (
    INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1
  ),
  role text NOT NULL,
  PRIMARY KEY (id)
);
COMMENT ON COLUMN member_roles.role IS 'dad,mom...';
CREATE TABLE repeat_types (
  id integer NOT NULL GENERATED ALWAYS AS IDENTITY (
    INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1
  ),
  type text NOT NULL,
  PRIMARY KEY (id)
);
COMMENT ON TABLE repeat_types IS 'enum';
COMMENT ON COLUMN repeat_types.type IS 'hourly, daily, weekly';
CREATE TABLE task_templates (
  id integer NOT NULL GENERATED ALWAYS AS IDENTITY (
    INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1
  ),
  title text NOT NULL,
  description text,
  category_id int NOT NULL,
  group_id int,
  PRIMARY KEY (id)
);
COMMENT ON COLUMN task_templates.group_id IS 'If null then global';
CREATE TABLE tasks (
  id integer NOT NULL GENERATED ALWAYS AS IDENTITY (
    INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1
  ),
  title text NOT NULL,
  description text,
  category_id int,
  due_date date,
  done boolean NOT NULL,
  repeat int NOT NULL,
  end_repeat date,
  urgent boolean NOT NULL,
  snooze_interval int,
  score int,
  PRIMARY KEY (id)
);
CREATE TABLE users (
  id integer NOT NULL GENERATED ALWAYS AS IDENTITY (
    INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1
  ),
  display_name text NOT NULL,
  email text NOT NULL,
  birth_date date NOT NULL,
  password text NOT NULL,
  image bytea,
  PRIMARY KEY (id)
);
CREATE TABLE weekly_badges (
  winner_id text,
  group_id int,
  date date,
  score int
);
