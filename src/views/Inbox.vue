<template>
  <data-loading :loadingData="chatUserListLoading" :handleUnauthorized="true" class="container inbox flex-grow-1 pa-5">
    <v-toolbar class="elevation-0 flex-grow-0">
      <v-toolbar-title>Inbox</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>

    <v-sheet class="chat-container d-flex flex-nowrap flex-grow-1 mt-5 gap-1" color="white" elevation="1" outlined>
      <inbox-user-list v-if="hvmq.md" class="d-none d-md-flex left-side-container"></inbox-user-list>
      <inbox-chat-box v-if="hvmq.md" class="d-none d-md-flex" :loggedInUser="loggedInUser"></inbox-chat-box>

      <v-tabs v-else class="d-md-none inbox-tabs" v-model="chatTab" fixed-tabs>
        <v-tabs-slider></v-tabs-slider>
        <v-tab> Users </v-tab>
        <v-tab> Chat </v-tab>

        <v-tabs-items v-model="chatTab" class="h-100 position-relative">
          <v-tab-item class="h-100 position-relative">
            <inbox-user-list></inbox-user-list>
          </v-tab-item>
          <v-tab-item class="h-100 position-relative">
            <inbox-chat-box :loggedInUser="loggedInUser"></inbox-chat-box>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-sheet>
  </data-loading>
</template>

<script lang="ts">
import Vue from 'vue';
import InboxUserList from '@/components/inbox/InboxUserList.vue';
import { mapState } from 'vuex';
import InboxChatBox from '@/components/inbox/InboxChatBox.vue';
import { hvmq } from '@/mixins';
import DataLoading from '../components/DataLoading.vue';

export default Vue.extend({
  mixins: [hvmq],
  components: { InboxUserList, InboxChatBox, DataLoading },
  name: 'Inbox',
  data: () => ({
    loading: false,
    rowSelected: undefined,
    chatTab: 0,
  }),
  created() {
    this.$store.dispatch('chat/init');
  },
  computed: {
    ...mapState('login', ['loggedInUser']),
    ...mapState('chat', ['chatUserListLoading', 'userSelected']),
  },
  watch: {
    userSelected(value) {
      if (value) this.chatTab = 1;
    },
  },
});
</script>

<style scoped lang="scss">
.inbox {
  .chat-container {
    height: 450px;
  }

  .inbox-tabs ::v-deep .v-tabs-items {
    height: calc(100% - 48px);
    .v-window__container {
      height: 100%;
      position: relative;
    }
  }
}
</style>
