export interface HeroStat {
  icon: string;
  title: string;
  value: string;
  colorClass: string;
  valueClass: string;
}

export interface HeroSocialLink {
  name: string;
  url: string;
  colorClass: string;
  iconType: 'github' | 'linkedin' | 'email';
}

export interface HeroData {
  badge: { icon: string; text: string };
  name: string;
  title: string;
  titleIcon: string;
  stats: HeroStat[];
  technologies: string[];
  socialLinks: HeroSocialLink[];
  cta: { download: string; contact: string };
}
