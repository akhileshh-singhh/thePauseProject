import { SiteShell } from "@/components/layout/SiteShell";
import {
  getEvents,
  getGallery,
  getSiteSettings,
  getSocialLinks,
  getTestimonials,
} from "@/lib/content";
import { AboutSection } from "@/sections/AboutSection";
import { ContactSection } from "@/sections/ContactSection";
import { FeaturedEventsSection } from "@/sections/FeaturedEventsSection";
import { GallerySection } from "@/sections/GallerySection";
import { HeroSection } from "@/sections/HeroSection";
import { SocialSection } from "@/sections/SocialSection";
import { TestimonialsSection } from "@/sections/TestimonialsSection";

export const revalidate = 60;

export default async function Home() {
  const [events, gallery, testimonials, settings, socialLinks] = await Promise.all([
    getEvents(),
    getGallery(),
    getTestimonials(),
    getSiteSettings(),
    getSocialLinks(),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteShell settings={settings}>
        <HeroSection settings={settings} />
        <AboutSection settings={settings} />
        <FeaturedEventsSection events={events} settings={settings} />
        <GallerySection images={gallery} settings={settings} />
        <TestimonialsSection testimonials={testimonials} settings={settings} />
        <SocialSection links={socialLinks} />
        <ContactSection settings={settings} />
      </SiteShell>
    </div>
  );
}
