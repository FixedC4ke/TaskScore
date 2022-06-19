--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3 (Debian 14.3-1.pgdg110+1)
-- Dumped by pg_dump version 14.3 (Debian 14.3-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    id uuid NOT NULL,
    client_user_id uuid,
    executor_user_id uuid,
    begin_date timestamp without time zone,
    end_date timestamp without time zone,
    score integer,
    title character varying,
    description character varying,
    cost integer,
    creation_date timestamp without time zone NOT NULL
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    username character varying NOT NULL,
    passhash character varying NOT NULL,
    role integer NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks (id, client_user_id, executor_user_id, begin_date, end_date, score, title, description, cost, creation_date) FROM stdin;
e8ee9ab7-a065-4b9a-859d-d4ec0a3c4879	45b3ee6f-3692-4e39-83cc-0aefe7e8d4bf	\N	\N	\N	\N	testtask	some description	\N	2022-06-19 07:26:05.346
25f372c1-4257-4750-988a-a8129e4eb8cf	45b3ee6f-3692-4e39-83cc-0aefe7e8d4bf	\N	\N	\N	100	testtask	some description	\N	2022-06-19 07:22:34.711
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, passhash, role) FROM stdin;
45b3ee6f-3692-4e39-83cc-0aefe7e8d4bf	test	$2b$10$9FtwKNusDB7xF4rm6k0xhekqalscjAYyH7.OxmXfJtzOr48fhgTia	1
\.


--
-- Name: tasks tasks_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pk PRIMARY KEY (id);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: tasks tasks_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_fk FOREIGN KEY (client_user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tasks tasks_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_fk_1 FOREIGN KEY (executor_user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON SCHEMA public TO taskscore;


--
-- PostgreSQL database dump complete
--

