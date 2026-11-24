BEGIN;

CREATE TABLE IF NOT EXISTS outreach_assets (
  id uuid PRIMARY KEY,
  kind text NOT NULL CHECK (kind IN ('video', 'thumbnail')),
  bytes integer NOT NULL CHECK (bytes > 0),
  state text NOT NULL DEFAULT 'pending' CHECK (state IN ('pending', 'attached', 'retired')),
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '90 minutes')
);

CREATE TABLE IF NOT EXISTS outreach_pages (
  id uuid PRIMARY KEY,
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  video_id uuid NOT NULL UNIQUE REFERENCES outreach_assets(id),
  thumbnail_id uuid NOT NULL UNIQUE REFERENCES outreach_assets(id),
  revision integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS outreach_activity (
  page_id uuid NOT NULL REFERENCES outreach_pages(id) ON DELETE CASCADE,
  visit_id uuid NOT NULL,
  video_id uuid NOT NULL,
  plays integer NOT NULL CHECK (plays BETWEEN 0 AND 1000),
  watched_ms integer NOT NULL CHECK (watched_ms BETWEEN 0 AND 86400000),
  completion integer NOT NULL CHECK (completion BETWEEN 0 AND 100),
  last_activity timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (page_id, visit_id)
);

CREATE TABLE IF NOT EXISTS outreach_login_attempts (
  fingerprint text NOT NULL,
  window_start bigint NOT NULL,
  attempts integer NOT NULL,
  PRIMARY KEY (fingerprint, window_start)
);

CREATE INDEX IF NOT EXISTS outreach_assets_cleanup_idx ON outreach_assets (expires_at) WHERE state <> 'attached';
CREATE INDEX IF NOT EXISTS outreach_login_window_idx ON outreach_login_attempts (window_start);

-- Keep page changes and asset ownership in the same transaction so concurrent
-- editors and cleanup cannot attach an expired or previously used upload.
CREATE OR REPLACE FUNCTION outreach_sync_assets() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    UPDATE outreach_assets SET state = 'retired' WHERE id IN (OLD.video_id, OLD.thumbnail_id);
    RETURN OLD;
  END IF;

  IF TG_OP = 'INSERT' OR OLD.video_id <> NEW.video_id THEN
    UPDATE outreach_assets SET state = 'attached'
      WHERE id = NEW.video_id AND kind = 'video' AND state = 'pending' AND expires_at > clock_timestamp();
    IF NOT FOUND THEN RAISE EXCEPTION 'Video upload is unavailable' USING ERRCODE = 'P0001'; END IF;
    IF TG_OP = 'UPDATE' THEN UPDATE outreach_assets SET state = 'retired' WHERE id = OLD.video_id; END IF;
  END IF;

  IF TG_OP = 'INSERT' OR OLD.thumbnail_id <> NEW.thumbnail_id THEN
    UPDATE outreach_assets SET state = 'attached'
      WHERE id = NEW.thumbnail_id AND kind = 'thumbnail' AND state = 'pending' AND expires_at > clock_timestamp();
    IF NOT FOUND THEN RAISE EXCEPTION 'Thumbnail upload is unavailable' USING ERRCODE = 'P0001'; END IF;
    IF TG_OP = 'UPDATE' THEN UPDATE outreach_assets SET state = 'retired' WHERE id = OLD.thumbnail_id; END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS outreach_sync_assets_trigger ON outreach_pages;
CREATE TRIGGER outreach_sync_assets_trigger AFTER INSERT OR UPDATE OF video_id, thumbnail_id OR DELETE ON outreach_pages
  FOR EACH ROW EXECUTE FUNCTION outreach_sync_assets();

COMMIT;
