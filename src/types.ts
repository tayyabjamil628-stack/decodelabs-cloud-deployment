export interface NavItem {
  label: string;
  href: string;
}

export interface CapabilityCard {
  id: string;
  category: 'cloud' | 'infrastructure' | 'web' | 'automation' | 'devops';
  title: string;
  description: string;
  iconName: string;
  techStack: string[];
  keyFeatures: string[];
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
}

export interface DeploymentPipelineStage {
  id: number;
  name: string;
  subtitle: string;
  service: string;
  status: 'configured' | 'active' | 'roadmap';
  description: string;
  icon: string;
  techSpecs: string[];
}

export interface CorePillar {
  title: string;
  description: string;
  icon: string;
  metric?: string;
  metricLabel?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}
