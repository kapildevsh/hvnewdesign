<template>
  <div class="flex-column position-relative h-100">
    <v-text-field
      append-icon="fa-search"
      class="search-box flex-grow-0 mt-1 mt-md-0"
      dense
      hide-details="auto"
      label="Search User"
      outlined
      @input="$store.dispatch('chat/userFilter', $event)"
    >
    </v-text-field>
    <v-list class="user-list overflow-auto flex-grow-1" two-line>
      <v-list-item-group
        :value="userSelectedIndex"
        color="primary"
        @change="$store.dispatch('chat/userSelected', chatUserListFiltered[$event])"
      >
        <v-list-item v-for="item in chatUserListFiltered" :key="item.id">
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.lastChat.msg }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action v-if="item.lastChat">
            <v-list-item-action-text><time v-bind-date-time="item.lastChat.date"/></v-list-item-action-text>
            <div>
              <v-tooltip color="primary" v-if="item.newMsgCount" top>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip outlined color="blue" x-small class="mx-1 my-0 px-1 py-2" v-bind="attrs" v-on="on">
                    {{ item.newMsgCount }}
                  </v-chip>
                </template>
                <span>{{ item.newMsgCount }} New messages</span>
              </v-tooltip>

              <v-tooltip color="primary" top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon x-small v-if="item.active" color="green" v-bind="attrs" v-on="on"> fa-circle </v-icon>
                </template>
                <span>{{ item.name }} Is Online</span>
              </v-tooltip>
            </div>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapState } from 'vuex';
import { ChatUser } from '../../models';

export default Vue.extend({
  name: 'InboxUserList',
  data: () => ({}),
  computed: {
    ...mapState('chat', ['userSelected']),
    ...mapGetters('chat', ['chatUserList', 'chatUserListFiltered']),
    userSelectedIndex() {
      if (!this.userSelected || !this.chatUserListFiltered) return -1;
      return this.chatUserListFiltered?.findIndex((t: ChatUser) => t.id === this.userSelected.id);
    },
  },
});
</script>

<style lang="scss" scoped>
.user-list {
  height: calc(100% - 40px);
  ::v-deep .v-list-item {
    cursor: pointer;
  }
}

.left-side-container {
  width: 40%;
  max-width: 450px;
}
</style>
