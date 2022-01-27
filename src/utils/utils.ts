import dayjs from 'dayjs';
import { User } from '../models';

export const isDev = process.env.NODE_ENV === 'development';

let id = Math.random() * 1000;

export function nextId(): string {
  return `hv-${++id}`;
}

export function dobToAge(dob: string): number | string {
  return dob ? dayjs().diff(dayjs(dob), 'years') : dob;
}

export function cmsToFeetInch(cms: number): string {
  const feet0 = +cms / 30.48; // 1 feet = 30.48cm
  const feet = Math.floor(feet0);
  const inches = Math.ceil((feet0 - feet) * 12);
  if (inches == 0) return `${feet} ft`;
  return `${feet}'${inches}''`;
}

export function feetInchToCms(feet: number, inches: number): number {
  return Math.ceil((feet + inches / 12) * 30.48);
}

export function joinCastes({ caste, subCaste }: User): string {
  if (!subCaste) return caste;
  return `${caste}, ${subCaste}`;
}

export function uRLSearchParams(data: Record<string, any>): URLSearchParams {
  return new URLSearchParams(Object.entries(data));
}

export function fileToUri(file: File): Promise<string> {
  return new Promise(resolve => {
    const reader = new FileReader();
    function consumer() {
      resolve(reader.result as string);
      reader.removeEventListener('load', consumer);
    }

    reader.addEventListener('load', consumer, false);
    reader.readAsDataURL(file);
  });
}

