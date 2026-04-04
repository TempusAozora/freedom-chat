ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anon_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY chat_messages_insert ON chat_messages
FOR INSERT
TO "chat-user"
WITH CHECK (anon_id = current_setting('anon.id')::uuid);

CREATE POLICY chat_messages_select ON chat_messages
FOR SELECT
TO "chat-user"
USING (anon_id = current_setting('anon.id')::uuid);
 
CREATE POLICY anon_data_select ON anon_data
FOR SELECT
TO "chat-user"
USING (ip_hashed = current_setting('anon.ip_hashed')::bytea);

CREATE POLICY anon_data_insert ON anon_data
FOR INSERT
TO "chat-user"
WITH CHECK (ip_hashed = current_setting('anon.ip_hashed')::bytea);