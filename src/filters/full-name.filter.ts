import Vue from 'vue';
import { User } from '../models';

Vue.filter('fullName', (user: Pick<User, 'firstName' | 'lastName'>) => {
  return user ? `${user.firstName} ${user.lastName || ''}` : '';
});
