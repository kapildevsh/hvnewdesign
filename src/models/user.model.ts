export interface GalleryItem {
  img: string;
  date: Date;
  id: number;
}

export interface PerfectMatchItem {
  id: string;
  content: string[];
  date: Date;
  avatar: string;
}

export interface Attribute {
  name: string;
  icon: string;
}

export interface About {
  title: string;
  icon: string;
  description: string;
  attributes: Attribute[];
  descriptionHtml?: boolean;
  singleColumn?: boolean;
}

export interface Profile {
  id: string;
  name: string;
  img: string;
  attributes: Attribute[] | string[];
  promptPremium: string;
}

export interface Explore {
  text: string;
  count: number;
  link: string;
}

export interface ProgressStatus {
  text: string;
  completed: boolean;
  link: string;
}

export interface Analytic {
  icon: string;
  title: string;
  count: number;
}

export interface Prompt {
  type: string;
}

export interface Attribute {
  name: string;
  icon: string;
}
// export enum BodyType {
//   AVERAGE = 'Average',
// } 
// export enum EthnicGroup {
//   NORTH_EAST = 'North East'
// }
export type BodyType = 'Fat' |'Slim' |'Average' |'Athletics'
export type Gender = 'Male' | 'Female';
export type ProfileFor = '';
export type RelationshipStatus = 'Single' | 'Divorced' | 'Never Married';
export type EthnicGroup = 'South Indian' | 'North Indian' | 'Bihari' | 'Bangali' | 'Kashmiri' | 'Pahadi' | 'Anglo Indian' | 'North East';
export type SkinColor = 'Very Fair';

export type YesNo = 'Yes' | 'No';

export interface AboutUser {
  aboutDisability: string
  aboutMyProfile: string
  anyDisability: YesNo
  bodyType: BodyType,
  customProfileID?: string
  dateOfBirth: string
  ethnicGroup: EthnicGroup
  firstName: string
  gender: Gender
  height: string
  img?: File
  secondaryLanguages: string
  lastName: string
  motherLanguage: string
  profileFor: ProfileFor
  profileID?: string
  relationshipStatus: RelationshipStatus
  skinColor: SkinColor
  userID: string
  weight: string
}
export interface User {
  aboutEducation: string;
  aboutFamily: string;
  aboutLifeStyle: string;
  aboutMe: string;
  aboutPreference: string;
  aboutReligion: string;
  analytics: Analytic[];
  annualIncome: string;
  bodyType: string;
  brothers: string;
  caste: string;
  companyDepartment: string;
  complexion: string;
  country: string;
  countryCode: string;
  diet: string;
  disability: string;
  disabilityDescription: string;
  dob: string;
  drinking: string;
  education: string;
  email: string;
  ethnicGroup: string;
  explore: Explore[];
  familyBrothers: number;
  familyCity: string;
  familyCountry: string;
  familyLocation: string;
  familyMarriedBrothers: number;
  familyMarriedSisters: number;
  familyNativePlace: string;
  familySisters: number;
  familyState: string;
  familyStatus: string;
  familyType: string;
  familyValues: string;
  father: string;
  fathersStatus: string;
  firstName: string;
  gender: 'F' | 'M';
  guru: string;
  guruOrganization: string;
  height: number;
  highestDegree: string;
  highestDegreeInstitution: string;
  highestEducation: string;
  id: string;
  img: string | File;
  income: string;
  kundaliMatch: string;
  kundliMatch: string;
  lastName: string;
  manglik: string;
  maritalStatus: string;
  marriedBrother: string;
  marriedSister: string;
  mobileNumber: string;
  mother: string;
  mothersStatus: string;
  motherTongue: string;
  occupation: string;
  ownCar: string;
  ownHouseFlat: string;
  party: string;
  password: string;
  perfectMatch: PerfectMatchItem[];
  preferredAge: number[];
  preferredCastCommunity: string;
  preferredCaste: string;
  preferredCity: string[];
  preferredCountry: string;
  preferredGender: string;
  preferredLanguage: string;
  preferredMaritalStatus: string;
  preferredReligion: string;
  preferredState: string[];
  preferredSubCaste: string;
  profileCreatedBy: string;
  profileCreatingFor: string;
  progressStatus: ProgressStatus[];
  prompts: Prompt[];
  registerProgress: number;
  religion: string;
  religiousBelief: string;
  secondaryLanguages: string[];
  sisters: string;
  smoking: string;
  subCaste: string;
  trustScore: number;
  userType: 'U' | 'MB';
  verified: boolean;
  weight: number;
  workingWith: string;
  workLocation: string;
  workout: string;
  yoga: string;
}
