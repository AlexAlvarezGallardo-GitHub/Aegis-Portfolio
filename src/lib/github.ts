import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const METRICS_PATH = join(process.cwd(), 'src', 'data', 'github-metrics.json');

export interface GitHubMetrics {
  repository: string;
  lastCommit: string;
  commitCount: number;
  openPullRequests: number;
  closedPullRequests: number;
  latestRelease: string | null;
  ciStatus: string;
  lastCiRun: string;
  generatedAt: string;
}

export function getDashboardData(): GitHubMetrics | null {
  if (!existsSync(METRICS_PATH)) return null;
  try {
    return JSON.parse(readFileSync(METRICS_PATH, 'utf-8')) as GitHubMetrics;
  } catch {
    return null;
  }
}
