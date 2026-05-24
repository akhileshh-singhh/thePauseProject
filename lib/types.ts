export type EventHost = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

export type WorkshopEvent = {
  title: string;
  slug: string;
  date: string;
  time: string;
  venue: string;
  price: string;
  image: string;
  bookingLink: string;
  shortDescription: string;
  description: string;
  gallery: string[];
  host: EventHost;
  category: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  context: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type SocialLinkItem = {
  id?: number;
  platform: string;
  title: string;
  description: string;
  href: string;
  cta_label: string;
};

export type SiteSettingsData = {
  site_name?: string;
  metadata_base_url?: string;
  default_meta_description?: string;
  hero_eyebrow?: string;
  hero_title?: string;
  hero_subtitle?: string;
  hero_cta_primary_label?: string;
  hero_cta_primary_href?: string;
  hero_cta_secondary_label?: string;
  hero_cta_secondary_href?: string;
  about_heading?: string;
  about_body?: string;
  about_sidebar_heading?: string;
  about_sidebar_body?: string;
  events_section_label?: string;
  events_section_heading?: string;
  events_section_body?: string;
  gallery_section_label?: string;
  gallery_section_heading?: string;
  gallery_section_body?: string;
  testimonials_section_label?: string;
  testimonials_section_heading?: string;
  contact_heading?: string;
  contact_body?: string;
  contact_address?: string;
  contact_whatsapp_url?: string;
  footer_tagline?: string;
  instagram_url?: string;
};
