ALTER TABLE contacts ADD COLUMN status TEXT NOT NULL DEFAULT 'lead'
  CHECK (status IN ('lead', 'active', 'inactive'));
