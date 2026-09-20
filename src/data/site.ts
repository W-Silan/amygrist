export const site = {
  name: 'Amy Grist', origin: 'https://amygrist.com',
  description: 'Trauma-informed Inner Child healing, holistic wellbeing, mentoring and practitioner training with Amy Grist.',
  instagram: 'https://www.instagram.com/amy.grist/',
};
// Keep unbuilt routes on the existing site during the foundation preview.
export function href(path: string) { return ['/', '/amy/', '/inner-council/', '/integration-work/', '/inner-child/', '/inner-child-mentoring/', '/one-to-one-coaching/', '/become-a-practitioner/', '/inner-child-reiki/', '/inner-child-card-readings/'].includes(path) ? path : `${site.origin}${path}`; }
export const navigation = [
 {label:'About', groups:[{label:'',items:[['About Me','/amy/'],['About The Inner Council','/inner-council/'],['Integration Work','/integration-work/']]}]},
 {label:'Offerings', groups:[
  {label:'Wellbeing',items:[['Inner Child Healing Workshop','/inner-child/'],['Inner Child Mentoring','/inner-child-mentoring/'],['Mindset & Wellbeing Coaching','/one-to-one-coaching/']]},
  {label:'Training Programs',items:[['Inner Child Practitioner Training','/become-a-practitioner/'],['Inner Child Reiki Course 1 & 2','/inner-child-reiki/']]},
  {label:'Resources',items:[['Free Meditation Series','/meditation/'],['Inner Child Card Readings','/inner-child-card-readings/'],['Inner Child Resources','/inner-child-resources/'],['Wellbeing Tools & Practices','/wellbeing-tools-practices/']]}
 ]},
 {label:'Blog',path:'/blog/'}, {label:'Get in Touch',path:'/get-in-touch/'},
 {label:'Shop',path:'/shop/',groups:[{label:'',items:[['Meditation Series','/product-category/meditation-series/']]}]}
];
