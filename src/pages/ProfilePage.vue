<template>
  <div class="container">
    <h1>My Profile</h1>
    <!-- <div class="flex-grid">
      <div class="col-3 push-top">
        <user-profile-card-vue v-if="!edit" :user="user" />
        <user-profile-card-editor-vue v-else :user="user" />
      </div>

      <div class="col-7 push-top">
        <div class="profile-header">
          <span class="text-lead"> {{ user.username }} recent activity </span>
          <a href="#">See only started threads?</a>
        </div>

        <hr />

        <post-list-vue :posts="user.posts" />
      </div>
    </div> -->
  </div>
</template>

<script>
// import PostListVue from '@/components/PostList.vue'
// import UserProfileCardVue from '@/components/UserProfileCard.vue'
// import UserProfileCardEditorVue from '@/components/UserProfileCardEditor.vue'
import store from '@/store'
import { mapGetters } from 'vuex'
export default {
  name: 'ProfilePage',
  // components: { PostListVue, UserProfileCardVue, UserProfileCardEditorVue },
  props: { edit: { type: Boolean, default: false } },
  computed: {
    ...mapGetters({ user: 'authUser' })
  },
  beforeRouteEnter(to, from) {
    if (!store.state.authId) return { name: 'Home' }
  },
  beforeRouteUpdate() {},
  beforeRouteLeave() {},
  created() {
    this.$emit('ready')
  }
}
</script>

<style scoped></style>
