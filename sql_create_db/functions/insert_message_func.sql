CREATE FUNCTION insert_message(user_ip inet, user_message TEXT)
RETURNS TIMESTAMPTZ
SECURITY DEFINER
    SET search_path = public
    AS $$
DECLARE
    new_tstamp TIMESTAMPTZ;
BEGIN
    INSERT INTO chat_messages (ip, msg)
    VALUES (user_ip, user_message)
    RETURNING tstamp INTO new_tstamp;

    RETURN new_tstamp;
END;
$$ LANGUAGE plpgsql;