import { cmsToFeetInch } from '../utils';

export const MIN_AGE = 18;
export const MAX_AGE = 80;
export const cardTextTruncateLength = 115;

if (MAX_AGE - MIN_AGE < 0 || MAX_AGE - MIN_AGE > 100) {
  throw new Error(`illegal age range: ${MIN_AGE} - ${MAX_AGE}`);
}

function freezeObjArray<T>(array: T[]): readonly Readonly<T>[] {
  return Object.freeze(array.map(Object.freeze)) as any;
}

export const MIN_HEIGHT = 122;
export const MAX_HEIGHT = 211;

export const validImgExts = Object.freeze(['.png', '.jpg', '.jpeg', '.jfif', '.pjpeg', '.pjp']);
export function isValidImg(filename: string): boolean {
  const ext = filename?.substring(filename.lastIndexOf('.'))?.toLowerCase();
  return validImgExts.includes(ext);
}

export const ageRange = Object.freeze(Array.from({ length: MAX_AGE - MIN_AGE }, (_, n) => n + MIN_AGE));
export const religions = Object.freeze([
  'Hindu',
  'Jain',
  'Muslim',
  'Christian',
  'Budhdhist',
  'Sikh',
  'Parsi',
  'Jewish',
]);
export const languages = Object.freeze([
  'Gujrati',
  'Hindi',
  'Kannada',
  'Malyalam',
  'Marathi',
  'Punjabi',
  'Tamil',
  'Telugu',
  'Urdu',
]);
export const castes = freezeObjArray([
  { text: 'Agarwal', value: 'Agarwal', subcastes: [] },
  { text: 'Gupta', value: 'Gupta', subcastes: [] },
  { text: 'Arora', value: 'Arora', subcastes: [] },
  { text: 'Bania', value: 'Bania', subcastes: [] },
  { text: 'Brahmin', value: 'Brahmin', subcastes: ['Brahmin Kanyakubj'] },
  { text: 'Jat', value: 'Jat', subcastes: [] },
  { text: 'Kayastha', value: 'Kayastha', subcastes: [] },
  { text: 'Khatri', value: 'Khatri', subcastes: [] },
  { text: 'Rajpoot', value: 'Rajpoot', subcastes: [] },
  { text: 'Shia', value: 'Shia', subcastes: [] },
  { text: 'Sunni', value: 'Sunni', subcastes: [] },
]);

export const countries = Object.freeze(['India', 'USA', 'UK', 'Austrailia']);
export const states = Object.freeze([
  'Delhi',
  'Chandigarh',
  'Gujarat',
  'Haryana',
  'Kolkata',
  'Maharashtra',
  'Rajasthan',
  'Punjab',
  'Uttar Pradesh',
  'West Bengal',
  'Telangana',
  'Madhya Pradesh',
  'Andhra Pradesh',
  'Tamil Nadu',
  'Kerala',
]);

export const profileFilters = freezeObjArray([
  { title: 'Religion', items: religions },
  {
    title: 'Caste',
    items: castes.map(s => s.text),
  },
  {
    title: 'State',
    items: states,
  },
  {
    title: 'Language',
    items: languages,
  },
  { title: 'Country', items: countries },
]);

export const shareOptions = freezeObjArray([
  {
    path: '/TODO',
    icon: 'fa-rss',
    img: '/images/social1.png',
  },
  {
    path: '/TODO',
    icon: ['fab', 'facebook-f'],
    fab: true,
    img: '/images/social3.png',
  },
  {
    path: '/TODO',
    icon: ['fab', 'twitter'],
    fab: true,
    img: '/images/social2.png',
  },
  {
    path: '/TODO',
    icon: ['fab', 'instagram'],
    img: '/images/social4.png',
    fab: true,
  },
  {
    path: '/TODO',
    icon: ['fab', 'linkedin'],
    img: '/images/social5.png',
    fab: true,
  },
]);

export const steps = freezeObjArray([
  {
    title: 'Signup',
    description: 'Register for free & put up your profile',
    img: '/images/signup.png',
  },
  {
    title: 'Connect',
    description: 'Select and connect with matches you like',
    img: '/images/connect.png',
  },
  {
    title: 'Interact',
    description: 'Become a premium member and start conversion',
    img: '/images/interect.png',
  },
]);

export const contactOptions = freezeObjArray([
  {
    title: 'Send Personal Messages',
    description: 'Send Personal Messages to Members of your Choice Unlimited',
    icon: 'fa-comments',
  },
  {
    title: 'View Contact',
    description: 'View contact numbers and call or text messages',
    icon: 'fa-mobile',
  },
  {
    title: 'See Email',
    description: 'Talk via emails, share more pictures, biodata, kundli etc.',
    icon: 'fa-envelope',
  },
  {
    title: 'Get Priority Display',
    description: 'Of your profile on all searches',
    icon: 'fa-desktop',
  },
  {
    title: 'Chat',
    description: 'Talk via emails, Share more pictures. biodata, kundli etc.',
    icon: 'fa-comment',
  },
  {
    title: 'Marriage Proposals',
    description: 'See all indian marriage proposals',
    icon: 'fa-camera-retro',
  },
]);

export const bodyTypes = Object.freeze(['Fat', 'Slim', 'Average', 'Athletics']);
export const hobbies = Object.freeze(['Painting', 'Drink', 'Reading', 'Dancing', 'Cricket', 'Smoking']);
export const interests = Object.freeze(['Painting', 'Drink', 'Reading', 'Dancing', 'Cricket', 'Smoking']);
export const skinColor = Object.freeze(['Very Fair', 'Fair', 'Wheatish', 'Wheatish Brown', 'Dark']);
export const disabilities = Object.freeze([
  'Blindness',
  'Person with low vision',
  'Cerebral Palsy',
  'Hearing impairment',
  'Leprosy cured person',
  'Locomotor disability',
  'Mental illness',
  'Learning Disabilities (Dyslexia)',
  'No',
]);
export const ethnicGroup = Object.freeze(['South Indian', 'North Indian', 'Bihari', 'Bangali', 'Kashmiri', 'Pahadi', 'Anglo Indian', 'North East'])
export const languagesItems = Object.freeze([
  'Assamese',
  'Awadhi',
  'Banjara',
  'Bhojpuri',
  'Bengali',
  'Bhil',
  'Chakma',
  'Deccani',
  'Dhivehi',
  'Dogra',
  'Garhwali',
  'Gujarati',
  'Haryanvi',
  'Kamrupi',
  'Kashmiri',
  'Khas',
  'Konkani',
  'Kumaoni',
  'Kutchi',
  'Maithili',
  'Maldivian',
  'Marathi',
  'Magahi',
  'Nagpuri',
  'North Indian',
  'Odia',
  'Pahari',
  'Punjabi',
  'Rajasthani',
  'Marwaris',
  'Rohingya',
  'Sindhi',
  'Memons',
  'Saraiki',
  'Saurashtra',
  'Sinhalese',
  'Sylheti',
  'Tanchangya',
  'Tharu',
]);

export const educations = freezeObjArray([
  {
    text: 'Doctorate (Phd)',
    value: 'phd',
    level: 10,
    values: ['Phd in Math', 'Phd in Physics'],
  },
  {
    text: "Master's",
    value: 'masters',
    level: 9,
    values: ['MA', 'MBA', 'MSC'],
  },
  {
    text: "Bachelor's",
    value: 'bachelors',
    level: 8,
    values: ['BA', 'BSC'],
  },
  {
    text: 'secondary',
    value: 'secondary',
    level: 2,
    values: ['secondary'],
  },
  {
    text: 'primary',
    value: 'primary',
    level: 1,
    values: ['primary'],
  },
]);

export const workingWith = Object.freeze(['Government Department', 'Freelancer', 'Business Owner', 'Not Working']);
export const companyDepartment = Object.freeze([
  'Government Department',
  'Freelancer',
  'Business Owner',
  'Not Working',
]);
export const occupations = Object.freeze(['Government Department', 'Freelancer', 'Business Owner', 'Not Working']);
export const annualIncomes = Object.freeze(['Under 1 Lakh', '1 Lakh to 2 Lakh']);
export const locations = Object.freeze(['Sirsa', 'Patna', 'JabalPur', 'N/A']);
export const fathersStatuses = Object.freeze(['Self Employed', 'Not Working']);
export const mothersStatuses = Object.freeze(['Self Employed', 'House Wife', 'Not Working']);
export const cities = Object.freeze([
  'Agra',
  'Varanasi',
  'Sarnath',
  'Lucknow',
  'Allahabad',
  'Fatehpur Sikri',
  'Mathura',
  'Ayodhya',
  'Aligarh',
  'Baldeo',
  'Balrampur',
  'Bithoor',
  'Noida',
  'Chitrakoot',
  'Faizabad',
  'Gokul',
  'Gorakhpur',
  'Jaunpur',
  'Jhansi',
  'Kannauj',
  'Kanpur',
  'Kaushambi',
  'Kushinagar',
  'Mahaban',
  'Meerut',
  'Rae Bareily',
  'Shravasti',
  'Vrindavan',
  'Kapilavastu',
  'Sunauli',
]);
export const nativePlaces = Object.freeze(['Sirsa', 'Moradabad']);
export const familyValues = Object.freeze(['Traditional', 'Open Minded']);
export const familyStatuses = Object.freeze(['Upper Class', 'Middle Class', 'Lower Class']);
export const religiousBeliefs = Object.freeze(['Extreme', 'Open']);
export const relationshipStatusItems = Object.freeze(['Single', 'Divorced', 'Never Married']);
export const heightItems = Object.freeze(['5 Feet 7 Inches']);