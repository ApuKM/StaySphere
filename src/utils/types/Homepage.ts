export interface NavLink {
  name: string;
  href: string;
  icon: React.ElementType;
}

export interface HeroSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

export interface BenefitItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
}