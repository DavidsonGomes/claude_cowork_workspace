export interface RoutineOverview {
  name: string;
  agent: string | null;
  last_status: string | null;
  last_run_at: string | null;
  last_duration_secs: number | null;
  total_runs: number;
  success_rate: number;
  avg_duration_secs: number;
}

export interface RoutineDetail {
  name: string;
  agent: string | null;
  total_runs: number;
  success_rate: number;
  avg_duration_secs: number;
  total_tokens: number | null;
  last_run: {
    status: string;
    started_at: string;
    duration_secs: number;
  } | null;
}

export interface RoutineRun {
  id: number;
  started_at: string;
  finished_at: string | null;
  duration_secs: number;
  status: string;
  return_code: number;
  retry_count: number;
  token_cost: number | null;
  error_summary: string | null;
  stdout_lines: number;
}
