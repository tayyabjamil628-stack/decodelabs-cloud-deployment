import { CapabilityCard, DeploymentPipelineStage, CorePillar, NavItem } from '../types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Deployment Architecture', href: '#project' },
  { label: 'Why DecodeLabs', href: '#why-us' },
  { label: 'Contact', href: '#contact' },
];

export const COMPANY_INFO = {
  name: 'DecodeLabs',
  tagline: 'Building Reliable Solutions for the Cloud',
  subtagline: 'DecodeLabs focuses on modern software engineering, cloud infrastructure, automation, and reliable digital solutions.',
  email: 'contact@decodelabs.tech',
  github: 'https://github.com/decodelabs',
  linkedin: 'https://linkedin.com/company/decodelabs',
  location: 'Cloud / Global',
  systemStatus: 'All Systems Operational',
  region: 'us-east-1 / AWS Cloud',
  version: 'v1.0.0-production',
};

export const CORE_PILLARS: CorePillar[] = [
  {
    title: 'Software Engineering',
    description: 'Constructing robust, modular TypeScript and React web applications built with micro-architectures and maintainable design patterns.',
    icon: 'Code2',
    metric: '100%',
    metricLabel: 'Type Safety & Testability'
  },
  {
    title: 'Cloud Computing & AWS',
    description: 'Deploying high-availability infrastructure utilizing AWS EC2, S3 static asset delivery, and optimized Nginx reverse proxies.',
    icon: 'Cloud',
    metric: '99.99%',
    metricLabel: 'Target SLA Uptime'
  },
  {
    title: 'Infrastructure & Automation',
    description: 'Eliminating manual toil through Infrastructure as Code (IaC), automated server provisioning, and reproducible environment declarations.',
    icon: 'Cpu',
    metric: 'Zero-Toil',
    metricLabel: 'Automated Deployments'
  },
  {
    title: 'Continuous Integration & Delivery',
    description: 'Designing GitHub Actions workflows to validate, test, build, and deploy production artifacts deterministically.',
    icon: 'GitBranch',
    metric: '< 3 min',
    metricLabel: 'Pipeline Execution'
  }
];

export const CAPABILITY_CARDS: CapabilityCard[] = [
  {
    id: 'cloud-compute',
    category: 'cloud',
    title: 'AWS Cloud Infrastructure',
    description: 'Production-grade compute provisioning on AWS EC2 backed by Amazon S3 storage and CloudFront CDN for edge distribution.',
    iconName: 'Server',
    techStack: ['AWS EC2', 'AWS S3', 'Ubuntu Server', 'IAM Roles'],
    keyFeatures: [
      'Isolated VPC networks with secure subnets',
      'Automated OS security patch management',
      'Cost-optimized instance lifecycle control',
      'Encrypted S3 bucket storage policies'
    ],
    codeSnippet: {
      language: 'bash',
      filename: 'ec2-user-data.sh',
      code: `#!/bin/bash
# DecodeLabs Node Provisioning Script
apt-get update && apt-get upgrade -y
apt-get install -y nginx git docker.io
systemctl enable --now nginx`
    }
  },
  {
    id: 'nginx-routing',
    category: 'infrastructure',
    title: 'Nginx Web Server & Reverse Proxy',
    description: 'High-throughput reverse proxy configuration with TLS/SSL termination, HTTP/2 multiplexing, and custom error routing.',
    iconName: 'Network',
    techStack: ['Nginx', 'SSL/TLS', 'Gzip/Brotli', 'Reverse Proxy'],
    keyFeatures: [
      'Gzip compression for static asset optimization',
      'Strict HTTP security response headers',
      'Upstream load balancing configuration',
      'Custom error pages and fallback handling'
    ],
    codeSnippet: {
      language: 'nginx',
      filename: 'decodelabs.conf',
      code: `server {
    listen 80;
    server_name decodelabs.tech;
    
    location / {
        root /var/www/decodelabs/dist;
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "public, no-cache";
    }
}`
    }
  },
  {
    id: 'web-engineering',
    category: 'web',
    title: 'Modern Web Engineering',
    description: 'Responsive, highly optimized SPA client applications constructed with React 19, TypeScript, and Tailwind CSS.',
    iconName: 'LayoutGrid',
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Motion'],
    keyFeatures: [
      'Sub-100ms first contentful paint (FCP)',
      'Design tokens for systematic color and typography',
      'Full WCAG AA keyboard accessibility',
      'Atomic component directory organization'
    ],
    codeSnippet: {
      language: 'typescript',
      filename: 'tokens.ts',
      code: `export const brandTokens = {
  bgBase: '#080c14',
  bgCard: '#131c31',
  textPrimary: '#f8fafc',
  accentBlue: '#3b82f6',
  accentCyan: '#06b6d4'
};`
    }
  },
  {
    id: 'automation-cicd',
    category: 'automation',
    title: 'Automated CI/CD Workflows',
    description: 'GitHub Actions workflow pipeline blueprint for automated linting, building, asset sync to AWS S3, and server reloading.',
    iconName: 'Zap',
    techStack: ['GitHub Actions', 'AWS CLI', 'SSH Deploy', 'Docker'],
    keyFeatures: [
      'Automated unit testing & type checking',
      'Atomic asset synchronization to S3',
      'Zero-downtime Nginx reload commands',
      'Automated rollback on build failure'
    ],
    codeSnippet: {
      language: 'yaml',
      filename: '.github/workflows/deploy.yml',
      code: `name: Deploy DecodeLabs Web
on:
  push:
    branches: [ main ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build App
        run: npm ci && npm run build`
    }
  },
  {
    id: 'devops-observability',
    category: 'devops',
    title: 'Observability & Security',
    description: 'Proactive system metrics, access logging, security hardening, and environment health verification.',
    iconName: 'ShieldCheck',
    techStack: ['CloudWatch', 'UFW Firewall', 'Systemd', 'Fail2ban'],
    keyFeatures: [
      'UFW Firewall rule configuration (Ports 80/443/22)',
      'Automated disk & memory threshold alerts',
      'Key-based SSH authentication enforcement',
      'Environment variable secret injection'
    ]
  }
];

export const DEPLOYMENT_PIPELINE: DeploymentPipelineStage[] = [
  {
    id: 1,
    name: 'Authoring & Local Studio',
    subtitle: 'AI Studio Development Environment',
    service: 'Google AI Studio',
    status: 'active',
    description: 'Component development, initial visual design iteration, and TypeScript validation in sandboxed cloud runtime.',
    icon: 'Code',
    techSpecs: ['Vite 6', 'React 19', 'TypeScript 5.8', 'Tailwind v4']
  },
  {
    id: 2,
    name: 'Version Control',
    subtitle: 'Source Code Repository',
    service: 'GitHub Repository',
    status: 'active',
    description: 'Structured Git versioning, pull request reviews, tag releases, and declarative environment tracking.',
    icon: 'GitBranch',
    techSpecs: ['Git LFS', 'Branch Protection', 'Commit Hooks', 'Release Tags']
  },
  {
    id: 3,
    name: 'Continuous Integration',
    subtitle: 'Automated Build Pipeline',
    service: 'GitHub Actions (Phase 2)',
    status: 'roadmap',
    description: 'Automated trigger on main branch push. Executes npm lint, vite build, and S3 asset synchronization.',
    icon: 'Workflow',
    techSpecs: ['Ubuntu Runner', 'AWS CLI v2', 'Artifact Caching', 'Build Matrix']
  },
  {
    id: 4,
    name: 'Object Storage & Assets',
    subtitle: 'Static Media & Bundle Host',
    service: 'AWS S3 Storage',
    status: 'roadmap',
    description: 'Scalable bucket hosting for compiled JS/CSS artifacts and static images with public read policies.',
    icon: 'Database',
    techSpecs: ['S3 Bucket', 'Lifecycle Rules', 'CORS Config', 'Gzip Bundles']
  },
  {
    id: 5,
    name: 'Virtual Server Engine',
    subtitle: 'Compute Node',
    service: 'AWS EC2 (Ubuntu 24.04 LTS)',
    status: 'roadmap',
    description: 'Dedicated cloud virtual machine handling web requests, process management, and security firewalls.',
    icon: 'Server',
    techSpecs: ['Ubuntu LTS', 'Systemd Services', 'UFW Firewall', 'Elastic IP']
  },
  {
    id: 6,
    name: 'Web Server & Ingress',
    subtitle: 'Reverse Proxy & Edge Ingress',
    service: 'Nginx Web Server',
    status: 'roadmap',
    description: 'Receives inbound HTTP/HTTPS traffic, serves SPA static routes, and proxies API endpoints securely.',
    icon: 'Globe',
    techSpecs: ['Nginx 1.24', 'HTTP/2', 'Gzip Compression', 'Custom Headers']
  }
];

export const WHY_DECODELABS_REASONS = [
  {
    title: 'No Artificial Complexity',
    description: 'We avoid over-engineering. Every component, server configuration, and script serves a clear engineering purpose.',
    icon: 'CheckCircle2'
  },
  {
    title: 'Infrastructure as Code',
    description: 'Environments are defined declaratively in scripts and code files, eliminating untracked manual server changes.',
    icon: 'FileCode2'
  },
  {
    title: 'Security-First Defaults',
    description: 'Strict HTTP response headers, key-based authentication, and minimal open ports from day one.',
    icon: 'Lock'
  },
  {
    title: 'Cloud-Agnostic Design',
    description: 'Built on open standards like Linux, Nginx, and Git, ensuring seamless migration or hybrid cloud support.',
    icon: 'Layers'
  }
];
