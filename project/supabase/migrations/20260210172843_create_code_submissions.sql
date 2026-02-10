/*
  # Code Compiler Schema

  1. New Tables
    - `code_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `language` (text) - Programming language used (python, javascript, cpp, java, etc.)
      - `code` (text) - The source code submitted
      - `output` (text) - Execution output or compilation result
      - `status` (text) - Execution status (success, error, timeout)
      - `created_at` (timestamptz) - Timestamp of submission

  2. Security
    - Enable RLS on `code_submissions` table
    - Add policies for public access (anyone can submit and view code)
*/

CREATE TABLE IF NOT EXISTS code_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  language text NOT NULL,
  code text NOT NULL,
  output text DEFAULT '',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE code_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert code submissions"
  ON code_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view code submissions"
  ON code_submissions
  FOR SELECT
  TO anon, authenticated
  USING (true);