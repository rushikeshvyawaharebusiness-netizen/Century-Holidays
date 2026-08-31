/*
  Single source of truth for how travellers reach us. Update the number here and
  every phone link, WhatsApp CTA and structured-data entry follows.
*/
export const PHONE_E164 = '+917066187551';
export const PHONE_DISPLAY = '+91 7066187551';
export const PHONE_HREF = `tel:${PHONE_E164}`;

const WHATSAPP_NUMBER = '917066187551';

export const EMAIL = 'contact@centuryholidays.in';
export const EMAIL_HREF = `mailto:${EMAIL}`;

/** Published social profiles, also mirrored in the homepage structured data. */
export const SOCIAL = {
  instagram: 'https://www.instagram.com/centuryholidays',
  facebook: 'https://www.facebook.com/centuryholidays',
};

/** WhatsApp deep link with a pre-filled message, so the first reply already has context. */
export function whatsappLink(message = "Hi Century Holidays! I'd like help planning a trip.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Enquiry link for a specific package, pre-selecting it on the booking form. */
export function bookingLink(slug?: string) {
  return slug ? `/book.html?destination=${slug}` : '/book.html';
}
