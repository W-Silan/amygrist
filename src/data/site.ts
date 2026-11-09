export const site = {
  name: 'Amy Grist', origin: 'https://amygrist.com',
  description: 'Trauma-informed Inner Child healing, holistic wellbeing, mentoring and practitioner training with Amy Grist.',
  instagram: 'https://www.instagram.com/amy.grist/',
};
// Keep unbuilt routes on the existing site during the foundation preview.
export function href(path: string) {
  let value = path;
  try {
    const parsed = new URL(path, site.origin);
    if (parsed.origin === site.origin) value = parsed.pathname + parsed.search + parsed.hash;
  } catch { /* Keep malformed values as supplied. */ }
  if (value === '/inner-child/' || value === '/inner-child') value = '/inner-child-therapy/';
  const local = ['/', '/meditation/', '/sacred-space-meditation-course/', '/amy/', '/inner-council/', '/integration-work/', '/inner-child-therapy/', '/inner-child-mentoring/', '/one-to-one-coaching/', '/become-a-practitioner/', '/inner-child-reiki/', '/inner-child-reiki-offering/', '/inner-child-card-readings/', '/inner-child-resources/', '/wellbeing-tools-practices/', '/contact/', '/feedback/', '/personal-yoga/', '/blog/', '/shop/', '/product-category/meditation-series/'];
  return local.includes(value) ? value : `${site.origin}${value}`;
}
export const navigation = [
 {label:'About', groups:[{label:'',items:[['About Me','/amy/'],['The Inner Council','/inner-council/'],['Integration Work','/integration-work/']]}]},
 {label:'Offerings', groups:[
  {label:'Wellbeing',items:[['Inner Child Healing Workshop','/inner-child-therapy/'],['Inner Child Mentoring','/inner-child-mentoring/'],['Mindset & Wellbeing Coaching','/one-to-one-coaching/']]},
  {label:'Training Programs',items:[['Inner Child Practitioner Training','/become-a-practitioner/'],['Inner Child Reiki Course 1 & 2','/inner-child-reiki/']]},
  {label:'Resources',items:[['Free Meditation Series','/meditation/'],['Sacred Inner Space Meditation Course','/sacred-space-meditation-course/'],['Inner Child Card Readings','/inner-child-card-readings/'],['Inner Child Resources','/inner-child-resources/'],['Wellbeing Tools & Practices','/wellbeing-tools-practices/']]}
 ]},
 {label:'Blog',path:'/blog/'}, {label:'Contact',path:'/contact/'}, {label:'Shop',path:'/shop/'}
];
