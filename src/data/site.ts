export const platform = {
  name: 'Aegis',
  tagline: 'AI-Orchestrated Financial Reference Architecture',
  description:
    'Production-oriented financial reference architecture built with modern cloud architecture, distributed systems and AI-assisted engineering.',
  github: 'https://github.com/AlexAlvarezGallardo-GitHub/Aegis',
};

export const services = [
  {
    name: 'Identity',
    status: 'Built',
    description: 'Registration, authentication and RBAC with strict hexagonal boundaries.',
  },
  {
    name: 'BFF',
    status: 'Built',
    description: 'Backend for Frontend — HttpOnly session cookies, JWT proxy, CSRF protection.',
  },
  {
    name: 'Wallet',
    status: 'Built',
    description: 'Digital wallets, balance management and idempotent ledger operations.',
  },
  {
    name: 'Payments',
    status: 'Planned',
    description: 'Payment processing, reconciliation and 3-D Secure.',
  },
  {
    name: 'Fraud',
    status: 'Built',
    description: 'Real-time risk scoring and a rules engine protecting every transaction.',
  },
  {
    name: 'Notifications',
    status: 'Planned',
    description: 'Email, SMS and push with templating and delivery tracking.',
  },
  {
    name: 'Audit',
    status: 'Built',
    description: 'Immutable, append-only audit trail for financial events.',
  },
  {
    name: 'Reporting',
    status: 'Partial',
    description: 'Balance projections and event-driven analytics (partial).',
  },
];

export const techStack = [
  { name: 'Java 21', role: 'Language' },
  { name: 'Spring Boot 3', role: 'Backend framework' },
  { name: 'PostgreSQL 16', role: 'Persistence' },
  { name: 'Apache Kafka', role: 'Event backbone' },
  { name: 'Redis 7', role: 'Distributed sessions' },
  { name: 'Angular 22', role: 'Frontend SPA' },
  { name: 'OpenAPI 3', role: 'Spec-first contracts' },
  { name: 'Kubernetes', role: 'Orchestration' },
  { name: 'Helm', role: 'Packaging' },
  { name: 'Argo CD', role: 'GitOps delivery' },
  { name: 'GitHub Actions', role: 'CI/CD' },
  { name: 'OpenTelemetry', role: 'Observability' },
];

export const engineeringDecisions = [
  {
    title: 'Why microservices?',
    points: [
      'Business isolation across bounded contexts',
      'Independent deployment and scaling',
      'Each service owns its data — no shared databases',
    ],
  },
  {
    title: 'Why Kafka?',
    points: [
      'Asynchronous, event-driven communication',
      'High throughput, persistent, replayable events',
      'Paired with a transactional outbox for reliable delivery',
    ],
  },
  {
    title: 'Why a transactional outbox?',
    points: [
      'Guaranteed at-least-once delivery without distributed transactions',
      'Aggregate + event persist in a single ACID transaction',
      'Relay scheduler forwards to Kafka and updates state on ack',
    ],
  },
  {
    title: 'Why hexagonal architecture?',
    points: [
      'Domain layer is pure Java — zero framework dependencies',
      'Infrastructure swaps (JPA, Kafka) without touching business rules',
      'Enforced automatically by Checkstyle in CI',
    ],
  },
  {
    title: 'Why PostgreSQL?',
    points: [
      'ACID consistency — non-negotiable for financial data',
      'Relational integrity and mature tooling',
    ],
  },
  {
    title: 'Why Spring Boot?',
    points: [
      'Industry standard with a massive production ecosystem',
      'Maven multi-module + Checkstyle for quality-gated builds',
    ],
  },
  {
    title: 'Why Kubernetes + Argo CD?',
    points: [
      'Infrastructure as Code with immutable deployments',
      'Environment overlays for dev / pre / stage / prod',
      'Argo CD owns deployment — GitHub Actions never deploys directly',
    ],
  },
  {
    title: 'Why OpenTelemetry?',
    points: [
      'Distributed tracing across services',
      'Production diagnostics and performance analysis',
    ],
  },
];

export const observability = [
  { name: 'Metrics', tool: 'Prometheus' },
  { name: 'Distributed Tracing', tool: 'OpenTelemetry + Tempo' },
  { name: 'Structured Logging', tool: 'Loki' },
  { name: 'Dashboards', tool: 'Grafana' },
  { name: 'Alerts', tool: 'Grafana / Prometheus' },
  { name: 'Health Checks', tool: 'Spring Actuator' },
];

export const infrastructure = [
  { name: 'CI/CD', tool: 'GitHub Actions — matrix builds, parallel quality gates' },
  { name: 'Containerization', tool: 'Docker multi-stage, distroless images' },
  { name: 'Container Registry', tool: 'GHCR with immutable image tags' },
  { name: 'Orchestration', tool: 'Kubernetes + Helm, base and environment overlays' },
  { name: 'Deployment Strategy', tool: 'GitOps via Argo CD — declarative DEV app-of-apps (one-time bootstrap)' },
  { name: 'Secrets Management', tool: 'Kubernetes secrets + gitleaks pre-commit' },
  { name: 'Health Checks', tool: 'Actuator endpoints verified on deploy' },
  { name: 'Automatic Releases', tool: 'Automated release workflow' },
];

export const security = [
  'JWT + HttpOnly session cookies via the BFF',
  'RBAC role-based access control',
  'BCrypt password hashing (cost ≥ 10)',
  'CSRF protection and security headers (OWASP)',
  'Immutable, append-only audit logs (hash-chaining on roadmap)',
  'Secret scanning — Gitleaks, Trivy, CodeQL',
  'Software supply chain — Cosign signing, SBOM (Syft)',
  'Dependency automation — Dependabot / Renovate',
];

export const aiAgents = [
  {
    role: 'write-spec',
    name: 'Specification Agent',
    task: 'Turns business requirements into structured, unambiguous specs.',
  },
  {
    role: 'architect',
    name: 'Architecture Agent',
    task: 'Validates every line of code against the architectural constitution.',
  },
  {
    role: 'service-builder',
    name: 'Service Builder Agent',
    task: 'Implements Spring Boot services following hexagonal architecture.',
  },
  {
    role: 'frontend-builder',
    name: 'Frontend Builder Agent',
    task: 'Builds Angular components, services and state management.',
  },
  {
    role: 'test-engineer',
    name: 'Test Engineer Agent',
    task: 'Writes JUnit 5, Mockito and Testcontainers suites.',
  },
  {
    role: 'infra-engineer',
    name: 'Infrastructure Agent',
    task: 'Creates Docker, Kubernetes, Helm and CI/CD pipelines.',
  },
  {
    role: 'code-reviewer',
    name: 'Code Reviewer Agent',
    task: 'Enforces SOLID, clean code and architecture patterns.',
  },
  {
    role: 'security-reviewer',
    name: 'Security Reviewer Agent',
    task: 'Scans for secrets, validates OWASP compliance and secure API design.',
  },
];

export const roadmap = [
  {
    category: 'Completed',
    items: [
      'Identity Service — full hexagonal stack',
      'BFF Service — session security',
      'Wallet Service — ledger and idempotency',
      'Fraud Service — risk scoring and rules engine',
      'Audit Service — append-only event trail',
      'Transactional outbox on Kafka',
      'CI/CD with four parallel quality gates',
      'GitOps foundation with Argo CD and coverage for all six services',
      'Helm charts and environment overlays',
      'Observability stack (OTel, Tempo, Prometheus, Loki, Grafana)',
      'Security tooling (Trivy, CodeQL, Cosign, Dependabot)',
    ],
  },
  {
    category: 'In Progress',
    items: [
      'Reporting Service — analytics and dashboards',
      'Audit trail hardening — hash chaining',
      'Notification delivery',
    ],
  },
  {
    category: 'Planned',
    items: [
      'Payment processing and 3-D Secure',
      'API Gateway with rate limiting and circuit breakers',
      'Argo Rollouts — blue/green and canary deployments',
      'KEDA autoscaling',
      'Policy as Code — OPA Gatekeeper',
    ],
  },
  {
    category: 'Future Vision',
    items: [
      'External Secrets / HashiCorp Vault',
      'DORA metrics and ephemeral environments',
      'AI agent orchestration at runtime',
    ],
  },
];
