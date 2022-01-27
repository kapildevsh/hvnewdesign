import {
  ageRange,
  annualIncomes,
  bodyTypes,
  cities,
  castes,
  companyDepartment,
  complexion,
  countries,
  disabilities,
  educations,
  ethenicities,
  familyStatuses,
  familyValues,
  fathersStatuses,
  hobbies,
  interests,
  languages,
  locations,
  mothersStatuses,
  nativePlaces,
  occupations,
  religions,
  states,
  workingWith,
  religiousBeliefs,
  maritalStatuses,
  MIN_AGE,
  MAX_AGE,
  MIN_HEIGHT,
  MAX_HEIGHT,
} from '@/data/common-data';
import Vue from 'vue';

export const commonDataMixin = Vue.extend({
  data: () => ({
    MIN_AGE,
    MAX_AGE,
    MIN_HEIGHT,
    MAX_HEIGHT,
    hobbiesItems: hobbies,
    bodyTypesItems: bodyTypes,
    interestItems: interests,
    languagesItems: languages,
    complexionItems: complexion,
    ethenicitiesItems: ethenicities,
    disabilitiesItems: disabilities,
    religionsItems: religions,
    countriesItems: countries,
    ageItems: ageRange,
    educationItems: educations,
    masterDegreeItems: educations.find(e => e.value === 'masters').values,
    bachelorDegreeItems: educations.find(e => e.value === 'bachelors').values,
    companyDepartmentItems: companyDepartment,
    workingWithItems: workingWith,
    occupationItems: occupations,
    annualIncomeItems: annualIncomes,
    locationItems: locations,
    fathersStatusItems: fathersStatuses,
    mothersStatusItems: mothersStatuses,
    stateItems: states,
    cityItems: cities,
    nativePlaceItems: nativePlaces,
    familyValuesItems: familyValues,
    familyStatusItems: familyStatuses,
    casteItems: castes,
    religiousBeliefItems: religiousBeliefs,
    maritalStatusItems: maritalStatuses,
  }),
});