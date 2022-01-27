<template>
  <div class="white elevation-2">
    <div>
      <h2 :class="'font-weight-regular mt-4 mb-2 ' + titleClass">Address</h2>
      <ul class="unstyled-list pl-2">
        <li v-for="t in data.address" :key="t" class="body-1">{{ t }}</li>
      </ul>
    </div>
    <div>
      <h2 :class="'font-weight-regular mt-4 mb-2 ' + titleClass">Mobile</h2>
      <ul class="unstyled-list pl-2">
        <li v-for="t in data.contactNumbers" :key="t" class="body-1">{{ t }}</li>
      </ul>
    </div>

    <div>
      <h2 :class="'font-weight-regular mt-4 mb-2 ' + titleClass">Email</h2>
      <ul class="unstyled-list pl-2">
        <li v-for="t in data.emails" :key="t" class="body-1">{{ t }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MbContactList',
  props: ['data', 'showIcon', 'titleClass'],
};
</script>

<style></style>
