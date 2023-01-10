import Vue from 'vue';
import { Dictionary } from 'vue-router/types/router';
import { User } from '../models';

export type CommonSettingsPageTyped<T> = T & {
  userData: User;
  onUpdate: (user: User) => void;
  defaultSaveAction: (fields: string[], validate?: boolean, config?: { method: string; path: string }) => any;
};

export const commonSettingsPageMixin = Vue.extend({
  props: ['userData'],
  watch: {
    userData: {
      immediate: true,
      handler(value: User) {
        Object.assign(this, value || {});
        if (!value) return;

        this.onUpdate(value);
      },
    },
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onUpdate(user: User) {
      // this function is intended to be overridden
    },
    defaultSaveAction(fields: string[], validate?: boolean, path?: { method: string; path: string }) {
      if (validate) {
        this.$v.$touch();
        if (this.$v.$invalid) {
          console.log(
            this.$options.name,
            'Invalid Fields',
            Object.keys(this.$v.$params).filter(fieldName => this.$v[fieldName].$invalid)
          );
          return;
        }
      }

      const saveData = fields.reduce((acc, key) => {
        acc[key] = (this as any)[key];

        return acc;
      }, {} as Dictionary<any>);
      console.log(this.$options.name, 'Save: \n\n', JSON.stringify(saveData, null, 2));
      return saveData;
      // this.$store.dispatch('profile/update', { ...saveData });
      
    },
  },
});
