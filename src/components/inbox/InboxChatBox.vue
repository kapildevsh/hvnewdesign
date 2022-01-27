<template>
  <div
    class="chat-list-container flex-nowrap flex-column flex-grow-1 position-relative h-100 mt-1 mt-md-0"
    :class="{ 'flex-center': !userSelected || chatData.loading || chatData.failed }"
  >
    <h1 class="mx-2 text-center" v-if="!userSelected">Select a user to start chatting</h1>
    <div class="flex-center flex-column gap-2" v-if="chatData.loading || chatData.failed">
      <h1 v-if="chatData.loading">Loading Chats With</h1>
      <h1 v-if="chatData.failed">Failed to Load Chats With</h1>
      <h2>{{ chatData.user.name }}</h2>
      <caption v-if="chatData.failed">
        {{
          chatData.failed
        }}
      </caption>
      <v-progress-linear v-if="chatData.loading" indeterminate color="primary"></v-progress-linear>
    </div>
    <template v-else-if="userSelected">
      <v-toolbar class="flex-grow-0" color="primary" dark>
        <v-avatar :size="38" class="mr-2"><v-img :src="chatData.user.avatar" alt="User profile photo"/></v-avatar>
        <v-toolbar-title
          ><v-btn text link class="pa-0" :href="'/#/profile/' + chatData.user.id">{{
            chatData.user.name
          }}</v-btn></v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon small>fa-search</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon small>fa-ellipsis-v</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider class="flex-grow-0"></v-divider>
      <ul class="chat-list position-relative flex-grow-1 overflow-auto ma-2" v-scroll-to-bottom>
        <li
          class="chat-item w-100 position-relative"
          v-for="item in chatData.data"
          :key="item.id"
          :class="item.ownerId === loggedInUser.id ? 'align-self-end' : 'align-self-start'"
        >
          <p class="chat-message">{{ item.msg }}</p>
          <p class="time"><time v-bind-date-time="item.date" /></p>
        </li>
      </ul>
      <v-text-field
        class="send-box flex-grow-0"
        color="white"
        dense
        hide-details="auto"
        outlined
        placeholder="Type a message and Press Enter to send"
        ref="msgInput"
        solo
        v-model="msg"
        @keyup.enter="sendMsg()"
      >
        <template v-slot:append>
          <v-btn icon tile @click="sendMsg()"><v-icon>fa-paper-plane</v-icon></v-btn>
        </template>
      </v-text-field>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'InboxChatBox',
  props: ['loggedInUser'],
  data: () => ({ msg: null }),
  computed: {
    ...mapState('chat', ['chatData', 'userSelected']),
  },
  directives: {
    scrollToBottom(el: HTMLElement) {
      setTimeout(() => el.scrollTo(0, el.scrollHeight), 500);
    },
  },
  methods: {
    sendMsg() {
      if (this.msg?.trim().length) {
        this.$store
          .dispatch('chat/sendMsg', this.msg)
          .then(() => {
            this.msg = null;
          })
          .catch(err => console.error(err));
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.v-input ::v-deep {
  .fa-search {
    font-size: 1rem;
  }
  .fa-paper-plane {
    font-size: 1rem;
    color: blue !important;
    cursor: pointer;
  }
}

.chat-list-container {
  background-color: var(--inbox-chat-box-bg);

  .chat-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    height: calc(100% - 112px);

    .chat-item {
      width: 40%;
      max-width: 350px;
      margin-left: 1rem;
      margin-right: 1rem;

      .chat-message {
        padding: 0.5rem 1rem;
        margin-bottom: 0.25rem;
        border-radius: 5px;
        font-size: 14px;
      }

      .time {
        margin-left: 0.5rem;
        font-size: x-small;
      }

      &.align-self-start .chat-message {
        background: var(--v-primary-lighten1);
        color: white;
      }

      &.align-self-end .chat-message {
        background: var(--v-secondary-lighten3);
      }
    }
  }
}
</style>
