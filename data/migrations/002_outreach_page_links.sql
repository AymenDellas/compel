BEGIN;

CREATE EXTENSION IF NOT EXISTS unaccent;

CREATE TABLE IF NOT EXISTS outreach_page_links (
  slug text PRIMARY KEY,
  page_id uuid UNIQUE REFERENCES outreach_pages(id) ON DELETE SET NULL
);

-- Reserve each URL permanently so an old email never opens a different video.
CREATE OR REPLACE FUNCTION outreach_assign_page_link(prospect_id uuid, prospect_name text)
RETURNS void LANGUAGE plpgsql AS $$
DECLARE
  base text;
  candidate text;
  suffix integer := 1;
BEGIN
  base := trim(both '-' from left(regexp_replace(
    lower(unaccent(normalize(prospect_name, NFKC))), '[^[:alnum:]]+', '-', 'g'
  ), 100));
  base := coalesce(nullif(base, ''), 'prospect');

  -- UUID paths belong to links issued before name-based URLs.
  IF base ~ '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$' THEN
    base := 'prospect-' || base;
  END IF;

  candidate := base;
  LOOP
    INSERT INTO outreach_page_links (slug, page_id) VALUES (candidate, prospect_id)
    ON CONFLICT (slug) DO NOTHING;
    IF FOUND THEN RETURN; END IF;
    suffix := suffix + 1;
    candidate := base || '-' || suffix;
  END LOOP;
END;
$$;

CREATE OR REPLACE FUNCTION outreach_on_page_insert() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  PERFORM outreach_assign_page_link(NEW.id, NEW.name);
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER outreach_assign_page_link_trigger AFTER INSERT ON outreach_pages
  FOR EACH ROW EXECUTE FUNCTION outreach_on_page_insert();

DO $$
DECLARE
  page record;
BEGIN
  FOR page IN
    SELECT p.id, p.name FROM outreach_pages p
    WHERE NOT EXISTS (SELECT 1 FROM outreach_page_links l WHERE l.page_id = p.id)
    ORDER BY p.created_at, p.id
  LOOP
    PERFORM outreach_assign_page_link(page.id, page.name);
  END LOOP;
END;
$$;

COMMIT;
