const OWNER = 'AlexAlvarezGallardo-GitHub';
const REPO = 'Aegis';

function token(): string | undefined {
  return process.env.AEGIS_GITHUB_TOKEN;
}

async function gh(path: string, params = ''): Promise<{
  ok: boolean;
  data: unknown;
  total?: number;
}> {
  try {
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/${path}${params}`;
    const res = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'aegis-portfolio',
        ...(token() ? { Authorization: `Bearer ${token()}` } : {}),
      },
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) return { ok: false, data: null };

    const data = await res.json();

    let total: number | undefined;
    const link = res.headers.get('link');
    if (link) {
      const match = link.match(/[?&]page=(\d+)>; rel="last"/);
      if (match) total = Number(match[1]) * 100;
    }

    return { ok: true, data, total };
  } catch {
    return { ok: false, data: null };
  }
}

export interface DashboardData {
  live: boolean;
  repo: {
    stars: number;
    forks: number;
    watchers: number;
    openIssues: number;
    language: string;
    defaultBranch: string;
    updatedAt: string;
    htmlUrl: string;
  };
  commits: number;
  pulls: number;
  issues: number;
  releases: Array<{ tag: string; name: string; date: string; url: string }>;
  workflows: Array<{ name: string; status: string; conclusion: string; url: string }>;
  languages: Array<{ name: string; percent: number }>;
}

export async function getDashboardData(): Promise<DashboardData> {
  const [repoRes, commitsRes, pullsRes, issuesRes, releasesRes, runsRes, langsRes] =
    await Promise.all([
      gh(''),
      gh('commits', '?per_page=1'),
      gh('pulls', '?state=closed&per_page=1'),
      gh('issues', '?state=open&per_page=1'),
      gh('releases', '?per_page=4'),
      gh('actions/runs', '?per_page=6'),
      gh('languages'),
    ]);

  const repo = repoRes.ok
    ? (repoRes.data as {
        stargazers_count: number;
        forks_count: number;
        subscribers_count: number;
        open_issues_count: number;
        language: string;
        default_branch: string;
        pushed_at: string;
        html_url: string;
      })
    : null;

  const languages = (langsRes.ok ? langsRes.data : {}) as Record<string, number>;
  const langTotal = Object.values(languages).reduce((a, b) => a + b, 0);

  const releases = (releasesRes.ok ? releasesRes.data : []) as Array<{
    tag_name: string;
    name: string;
    published_at: string;
    html_url: string;
  }>;

  const runs = (runsRes.ok ? runsRes.data : {}) as {
    workflow_runs?: Array<{
      name: string;
      status: string;
      conclusion: string;
      html_url: string;
    }>;
  };

  const langEntries = Object.entries(languages)
    .map(([name, bytes]) => ({ name, percent: Math.round((bytes / langTotal) * 100) }))
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 5);

  return {
    live: repoRes.ok && commitsRes.ok && pullsRes.ok,
    repo: {
      stars: repo?.stargazers_count ?? 0,
      forks: repo?.forks_count ?? 0,
      watchers: repo?.subscribers_count ?? 0,
      openIssues: repo?.open_issues_count ?? 0,
      language: repo?.language ?? 'Java',
      defaultBranch: repo?.default_branch ?? 'main',
      updatedAt: repo?.pushed_at ?? '',
      htmlUrl: repo?.html_url ?? `https://github.com/${OWNER}/${REPO}`,
    },
    commits: commitsRes.total ?? 0,
    pulls: pullsRes.total ?? 0,
    issues: issuesRes.total ?? 0,
    releases: releases.map((r) => ({
      tag: r.tag_name,
      name: r.name || r.tag_name,
      date: r.published_at,
      url: r.html_url,
    })),
    workflows: (runs?.workflow_runs ?? []).map((r) => ({
      name: r.name,
      status: r.status,
      conclusion: r.conclusion,
      url: r.html_url,
    })),
    languages: langEntries,
  };
}
