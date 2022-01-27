import Vue from 'vue';
import { cmsToFeetInch, dobToAge } from '../utils';

Vue.filter('dobToAge', dobToAge);
Vue.filter('cmsToFeetInch', cmsToFeetInch);
