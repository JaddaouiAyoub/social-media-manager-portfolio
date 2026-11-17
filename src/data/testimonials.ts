/**
 * Testimonials.
 *
 * Only publish genuine feedback for which the author gave explicit
 * permission. While this list is empty, the section shows an elegant
 * empty state instead of fake quotes.
 */
export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company?: string;
  /** Optional avatar in /public/images/testimonials/, used only with permission. */
  avatar?: string;
  /** Must be true: confirms the author agreed to be published. */
  permissionGranted: boolean;
};

export const testimonials: Testimonial[] = [];

export const publishedTestimonials = testimonials.filter((t) => t.permissionGranted);
