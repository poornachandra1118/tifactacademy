/**
 * Contact Information API Data
 * Ti-Fact Academy — Office & Communication Details
 */

export const CONTACT_INFO = {
  success: true,
  organization: "Ti-Fact Academy",
  office: {
    label: "Office Address",
    address: "221 Riverside Lane, Austin, TX 78701",
    mapUrl: "https://maps.app.goo.gl/wAXmNV3ds9PKKGMk8",
    /**
     * Google Maps Embed src — derived from the shared location link.
     * Uses the /maps/embed endpoint with a q parameter matching the address.
     */
    embedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d990.5664968748342!2d78.44467147226445!3d17.436213902237817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90cf7256d953%3A0xa3aa900893d5fe57!2s17.435963%2C78%2C%20Ameerpet%2C%20Hyderabad%2C%20Telangana%20500038!5e0!3m2!1sen!2sin!4v1791866484878!5m2!1sen!2sin",
  },
  email: {
    label: "Email Us",
    address: "tifactacademy0907@gmail.com",
    href: "mailto:tifactacademy0907@gmail.com",
  },
  mobile: {
    label: "Call Us",
    number: "+91 94933 87137",
    display: "+91-9493387137",
    href: "tel:+919493387137",
  },
  social: {
    facebook: "https://facebook.com/tifactacademy",
    instagram: "https://instagram.com/tifactacademy",
    linkedin: "https://linkedin.com/company/tifactacademy",
    youtube: "https://youtube.com/@tifactacademy",
    twitter: "https://twitter.com/tifactacademy",
  },
};
