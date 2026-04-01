CREATE SEQUENCE chat_messages_id_seq;

CREATE TABLE public.chat_messages
(
    id integer NOT NULL DEFAULT nextval('chat_messages_id_seq'::regclass),
    ip inet NOT NULL,
    msg character varying(100) COLLATE pg_catalog."default" NOT NULL,
    tstamp timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chat_messages_pkey PRIMARY KEY (id)
);

CREATE VIEW public.public_chat_data AS
SELECT tstamp, msg
FROM chat_messages;