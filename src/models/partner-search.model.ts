import { Dictionary } from 'vue-router/types/router';
import { ageRange, MAX_HEIGHT, MIN_HEIGHT } from '../data/common-data';

export class PartnerSearchData {
  age = 21;
  toAge = ageRange[ageRange.length - 1];
  height = MIN_HEIGHT;
  toHeight = MAX_HEIGHT;
  gender: string = undefined;
  maritalStatus: string = undefined;
  martialReligion: string = undefined;
  martialMotherTongue: string = undefined;
  community: string = undefined;
  country: string = undefined;
  onlyProfilesWithPhotos = false;
  noFilteredMeProfiles = false;
}

export function parseQueryToPartnerSearchData(query: Dictionary<string | string[]>): PartnerSearchData {
  const data = query as { [key in keyof PartnerSearchData]: string };

  return {
    ...data,
    age: +data.age || ageRange[0],
    toAge: +data.toAge || ageRange[ageRange.length - 1],
    height: +data.height || MIN_HEIGHT,
    toHeight: +data.toHeight || MAX_HEIGHT,
    onlyProfilesWithPhotos: data.onlyProfilesWithPhotos === 'true',
    noFilteredMeProfiles: data.noFilteredMeProfiles === 'true',
  } as PartnerSearchData;
}
