-- Create heatmap_data table
CREATE TABLE IF NOT EXISTS heatmap_data (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  week_key text NOT NULL,
  days jsonb NOT NULL DEFAULT '[0,0,0,0,0,0,0]'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, week_key)
);

-- Enable RLS
ALTER TABLE heatmap_data ENABLE ROW LEVEL SECURITY;

-- Policy: users can read their own rows
CREATE POLICY "Users can read own heatmap data"
  ON heatmap_data FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: users can insert their own rows
CREATE POLICY "Users can insert own heatmap data"
  ON heatmap_data FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: users can update their own rows
CREATE POLICY "Users can update own heatmap data"
  ON heatmap_data FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Auto-update updated_at on changes
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER heatmap_data_updated_at
  BEFORE UPDATE ON heatmap_data
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
