import { signal, computed } from '@angular/core';

export interface Service {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  platform: string[];
  platformIcon: string;
  deliverables: string[];
  steps: { step: string; title: string; icon: string }[];
  testimonial: string;
  status: string;
  statusType: 'active' | 'coming' | 'beta';
  image: string;
  category: string;
  featured: boolean;
}

const initialServices: Service[] = [
  {
    id: "viral-reels-creator",
    name: "Viral Reels Creator",
    shortDescription: "Autonomous production of high-engagement vertical video. Leverages real-time trend analysis to generate scripts, visuals, and voiceovers.",
    fullDescription: "An autonomous neural agent engineered to dominate short-form vertical video. By cross-referencing global TikTok trends with your brand identity, it generates high-retention assets optimized for the current algorithm.",
    platform: ["TikTok", "Instagram", "Shorts"],
    platformIcon: "smart_toy",
    deliverables: [
      "3 High-Retention Scripts",
      "3 Generative Background Images",
      "3 Optimized Marketing Copies",
      "Trend Alignment Report"
    ],
    steps: [
      { step: "01", title: "Analyze Trends", icon: "trending_up" },
      { step: "02", title: "Generate Script", icon: "edit_note" },
      { step: "03", title: "Edit Video", icon: "movie_edit" }
    ],
    testimonial: "This agent reduced our content production costs by 84% in the first month. — Architecture Digital Lab",
    status: "Active Agent",
    statusType: "active",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDV4klFUIvvJ8bvGiuXP1kDHUpupnIo8HTWbN_v8UfB0p7MH1aaJVO4Sgmww1dOAFa0kXiH12n0S-gOV-u1k6Hs1WXOWCXdQ8wBBPUCmdDBhZxFObzZlDkZG4m3u_uRoLd6oWfy2RFKYsafJivfxlvh9X7_kXEg8jIpdBmVEx-S3TRUqvVGCW7p4wr_kp96_aeGQJcWkNYkw7GwAWsECVgunX32oIz21IZPJFPBjq0sxE0loPCH2JZRFmKnnfHoFt3zH-deQyikBhA",
    category: "Video",
    featured: true
  },
  {
    id: "copywriter-pro",
    name: "Copywriter Pro",
    shortDescription: "Mathematical precision in brand messaging. SEO-optimized and persona-targeted.",
    fullDescription: "Synthesizes complex industry data into authoritative content. Creates SEO-optimized copy tailored to specific buyer personas, maximizing conversion rates and organic reach.",
    platform: ["LinkedIn", "Blog", "Website"],
    platformIcon: "psychology",
    deliverables: [
      "5 SEO-Optimized Articles",
      "Brand Voice Guidelines",
      "Persona-Targeted Copy",
      "A/B Testing Framework"
    ],
    steps: [
      { step: "01", title: "Analyze Brand Voice", icon: "search" },
      { step: "02", title: "Generate Copy", icon: "edit" },
      { step: "03", title: "Optimize & Test", icon: "speed" }
    ],
    testimonial: "Our blog traffic increased 312% in 3 months. — Tech Startup Inc",
    status: "Active Agent",
    statusType: "active",
    image: "",
    category: "Copy",
    featured: true
  },
  {
    id: "thought-leader-ghostwriter",
    name: "Thought Leader Ghostwriter",
    shortDescription: "Synthesizes complex industry data into authoritative LinkedIn articles and carousels that drive B2B engagement.",
    fullDescription: "Transforms your expertise into thought leadership content. Creates LinkedIn articles, carousels, and posts that position you as an industry authority.",
    platform: ["LinkedIn"],
    platformIcon: "psychology",
    deliverables: [
      "4 LinkedIn Articles",
      "6 Carousel Presentations",
      "Engagement Strategy Guide",
      "Profile Optimization Tips"
    ],
    steps: [
      { step: "01", title: "Research Topics", icon: "science" },
      { step: "02", title: "Draft Content", icon: "edit_note" },
      { step: "03", title: "Optimize for Engagement", icon: "trending_up" }
    ],
    testimonial: "Now I publish consistently without spending hours writing. — CEO, Consulting Firm",
    status: "Active Agent",
    statusType: "active",
    image: "",
    category: "Copy",
    featured: false
  },
  {
    id: "aesthetic-curator",
    name: "Aesthetic Curator",
    shortDescription: "Maintains visual brand consistency through AI-generated imagery and grid layout optimization for lifestyle brands.",
    fullDescription: "Ensures your Instagram feed tells a cohesive visual story. Generates on-brand imagery and optimizes your grid layout for maximum aesthetic appeal.",
    platform: ["Instagram"],
    platformIcon: "photo_camera",
    deliverables: [
      "12 AI-Generated Images",
      "Grid Layout Plan",
      "Color Palette Guidelines",
      "Content Calendar"
    ],
    steps: [
      { step: "01", title: "Analyze Current Feed", icon: "grid_view" },
      { step: "02", title: "Generate Assets", icon: "auto_awesome" },
      { step: "03", title: "Optimize Layout", icon: "grid_on" }
    ],
    testimonial: "Our feed went from scattered to cohesive in weeks. — Fashion Brand",
    status: "Active Agent",
    statusType: "active",
    image: "",
    category: "Static",
    featured: false
  },
  {
    id: "ad-copy-optimizer",
    name: "Ad-Copy Optimizer",
    shortDescription: "Performs A/B testing on ad creative and headlines in real-time to maximize conversion across Meta and Google.",
    fullDescription: "Automates the creative testing process. Generates multiple ad variants and uses machine learning to identify top performers in real-time.",
    platform: ["Meta", "Google"],
    platformIcon: "campaign",
    deliverables: [
      "10 Ad Variations",
      "A/B Test Results",
      "Creative Optimization Report",
      "Budget Allocation Recommendations"
    ],
    steps: [
      { step: "01", title: "Analyze Audience", icon: "group" },
      { step: "02", title: "Generate Variants", icon: "content_copy" },
      { step: "03", title: "Test & Optimize", icon: "insights" }
    ],
    testimonial: "Cut our cost-per-acquisition by 45%. — E-commerce Brand",
    status: "Active Agent",
    statusType: "active",
    image: "",
    category: "Multi-Channel",
    featured: false
  },
  {
    id: "comment-engine-ai",
    name: "Comment Engine AI",
    shortDescription: "Monitors brand mentions and engages with users 24/7 to boost community sentiment and organic reach.",
    fullDescription: "Your 24/7 community manager. Monitors brand mentions, responds to comments, and engages with potential customers automatically.",
    platform: ["Community"],
    platformIcon: "forum",
    deliverables: [
      "Real-time Monitoring Dashboard",
      "Automated Response Templates",
      "Sentiment Analysis Report",
      "Engagement Strategy"
    ],
    steps: [
      { step: "01", title: "Monitor Mentions", icon: "notifications" },
      { step: "02", title: "Generate Responses", icon: "chat" },
      { step: "03", title: "Analyze Sentiment", icon: "psychology" }
    ],
    testimonial: "Our response time went from hours to seconds. — SaaS Company",
    status: "Active Agent",
    statusType: "active",
    image: "",
    category: "Community",
    featured: false
  },
  {
    id: "trend-prediction-model",
    name: "Trend Prediction Model",
    shortDescription: "Forecasts upcoming niche trends with 89% accuracy, allowing for proactive content strategy shifts.",
    fullDescription: "Stay ahead of the curve. Uses predictive analytics to identify emerging trends in your industry before they go mainstream.",
    platform: ["Analytics"],
    platformIcon: "monitoring",
    deliverables: [
      "Weekly Trend Reports",
      "Content Opportunity Analysis",
      "Competitive Landscape Map",
      "Strategic Recommendations"
    ],
    steps: [
      { step: "01", title: "Collect Data", icon: "database" },
      { step: "02", title: "Analyze Patterns", icon: "analytics" },
      { step: "03", title: "Predict Trends", icon: "trending_up" }
    ],
    testimonial: "We launched our first-mover campaign thanks to trend predictions. — Marketing Director",
    status: "Active Agent",
    statusType: "active",
    image: "",
    category: "Analytics",
    featured: false
  },
  {
    id: "strategy-bot",
    name: "Strategy Bot",
    shortDescription: "Predictive modeling for campaign ROI. Automated A/B testing at scale.",
    fullDescription: "Your strategic planning partner. Uses predictive modeling to forecast campaign outcomes and optimize budget allocation.",
    platform: ["Multi-Channel"],
    platformIcon: "auto_graph",
    deliverables: [
      "Campaign ROI Predictions",
      "Budget Optimization Plan",
      "A/B Testing Roadmap",
      "Performance Dashboards"
    ],
    steps: [
      { step: "01", title: "Define KPIs", icon: "flag" },
      { step: "02", title: "Build Models", icon: "model_training" },
      { step: "03", title: "Optimize Strategy", icon: "tune" }
    ],
    testimonial: "ROI improved 3x in one quarter. — Enterprise Client",
    status: "Coming Soon",
    statusType: "coming",
    image: "",
    category: "Analytics",
    featured: false
  }
];

// Signal para servicios con soporte CRUD
export const services = signal<Service[]>(initialServices);

// Funciones computed
export const getServices = computed(() => services());

export function getServiceById(id: string): Service | undefined {
  return services().find(s => s.id === id);
}

export function getFeaturedServices(): Service[] {
  return services().filter(s => s.featured);
}

export function getServicesByCategory(category: string): Service[] {
  if (category === 'all') return services();
  return services().filter(s => s.category.toLowerCase() === category.toLowerCase());
}

export function getServicesByPlatform(platform: string): Service[] {
  if (platform === 'all') return services();
  return services().filter(s => s.platform.some(p => p.toLowerCase().includes(platform.toLowerCase())));
}

export function searchServices(query: string): Service[] {
  const q = query.toLowerCase();
  return services().filter(s => 
    s.name.toLowerCase().includes(q) || 
    s.shortDescription.toLowerCase().includes(q)
  );
}

// Funciones CRUD
export function addService(service: Omit<Service, 'id'>): Service {
  const newService: Service = {
    ...service,
    id: generateId(service.name)
  };
  services.update(current => [...current, newService]);
  return newService;
}

export function removeService(id: string): boolean {
  const currentServices = services();
  const index = currentServices.findIndex(s => s.id === id);
  
  if (index === -1) return false;
  
  services.update(current => current.filter(s => s.id !== id));
  return true;
}

export function updateService(id: string, updates: Partial<Service>): boolean {
  const currentServices = services();
  const index = currentServices.findIndex(s => s.id === id);
  
  if (index === -1) return false;
  
  services.update(current => 
    current.map(s => s.id === id ? { ...s, ...updates } : s)
  );
  return true;
}

// Helper para generar ID único
function generateId(name: string): string {
  const baseId = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const existingIds = services().map(s => s.id);
  
  if (!existingIds.includes(baseId)) return baseId;
  
  let counter = 1;
  while (existingIds.includes(`${baseId}-${counter}`)) {
    counter++;
  }
  return `${baseId}-${counter}`;
}