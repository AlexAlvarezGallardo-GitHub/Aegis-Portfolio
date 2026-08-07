export interface EvidenceItem {
  src: string;
  title: string;
  caption: string;
}

export interface EvidenceGroup {
  id: string;
  label: string;
  note: string;
  items: EvidenceItem[];
}

export const evidenceGroups: EvidenceGroup[] = [
  {
    id: 'app',
    label: 'Application in action',
    note: 'The Angular SPA against the running services.',
    items: [
      {
        src: 'evidence/app/01-login-filled.png',
        title: 'Sign in',
        caption:
          'Identity service — credentials verified against BCrypt-hashed passwords, session secured with JWT + HttpOnly cookies.',
      },
      {
        src: 'evidence/app/02-wallets-premium.png',
        title: 'Wallet list',
        caption:
          'User wallets rendered by the Angular SPA, served by the Wallet service REST API.',
      },
      {
        src: 'evidence/app/03-wallet-detail-deposit-section.png',
        title: 'Wallet detail',
        caption:
          'Account view with balance and the deposit action surfaced from the ledger aggregate.',
      },
      {
        src: 'evidence/app/04-deposit-form-filled.png',
        title: 'Deposit form',
        caption:
          'Deposit form — amount, currency, source and a unique client reference for idempotency.',
      },
      {
        src: 'evidence/app/05-deposit-receipt.png',
        title: 'Deposit receipt',
        caption:
          'Confirmed deposit — the ledger is updated atomically and a domain event is written to the outbox.',
      },
      {
        src: 'evidence/app/06-dup-reference-rejected.png',
        title: 'Duplicate reference rejected',
        caption:
          'Reusing a deposit reference is rejected — idempotency is enforced in the domain, not the UI.',
      },
      {
        src: 'evidence/app/07-create-wallet-form.png',
        title: 'Create wallet',
        caption: 'Wallet creation form — currency selection in a hexagonal, contract-first API.',
      },
      {
        src: 'evidence/app/08-two-wallets.png',
        title: 'Multiple wallets',
        caption:
          'Two wallets created and persisted in PostgreSQL — each bounded context owns its data.',
      },
      {
        src: 'evidence/app/09-kafka-topics-list.png',
        title: 'Kafka topics',
        caption: 'Event topology — one topic per bounded context on the shared Kafka backbone.',
      },
      {
        src: 'evidence/app/10-kafka-topic-wallet-funds.png',
        title: 'wallet.funds.deposited topic',
        caption: 'Partitions and retention configuration of the funds deposit topic.',
      },
      {
        src: 'evidence/app/11-kafka-wallet-funds-messages.png',
        title: 'Event payloads',
        caption:
          'FUNDS_DEPOSITED events on the wire — produced reliably by the transactional outbox relay.',
      },
      {
        src: 'evidence/app/12-kafka-fraud-topic.png',
        title: 'fraud topic',
        caption: 'Fraud-related events routed for real-time scoring and rules evaluation.',
      },
    ],
  },
  {
    id: 'observability',
    label: 'Observability evidence',
    note: 'Real traces and load results from the running stack.',
    items: [
      {
        src: 'evidence/observability/evidence-dashboard.png',
        title: 'Evidence dashboard',
        caption:
          'Rendered summary of captured traces and the load-test results collected against the running stack.',
      },
      {
        src: 'evidence/observability/grafana-tempo-traces.png',
        title: 'Grafana Tempo — trace list',
        caption:
          'Real traces of aegis-wallet-service in the Grafana UI — outbox relay, reconciliation and health checks.',
      },
      {
        src: 'evidence/observability/grafana-trace-detail.png',
        title: 'Grafana — trace waterfall',
        caption:
          'Outbox relay span detail (relay-pending-events, 1.15 ms) captured from the actual Tempo backend.',
      },
    ],
  },
];

export const evidenceSource = {
  label: 'View all evidence on GitHub',
  href: 'https://github.com/AlexAlvarezGallardo-GitHub/Aegis/tree/main/evidence',
};

export const loadTest = {
  label: 'Load test results (40 concurrent deposits)',
  href: 'https://github.com/AlexAlvarezGallardo-GitHub/Aegis/blob/main/evidence/observability/load-test-deposits.md',
};
