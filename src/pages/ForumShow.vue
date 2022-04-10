<template>
  <div v-if="forum && threadLoaded" class="col-full push-top">
    <div class="forum-header">
      <div class="forum-details">
        <h1>{{ forum.name }}</h1>
        <p class="text-lead">{{ forum.description }}</p>
      </div>
      <router-link
        v-if="forum?.id"
        :to="{
          name: 'ThreadCreate',
          params: { forumId: forum.id }
        }"
        class="btn-green btn-small"
      >
        Start a thread
      </router-link>
    </div>
  </div>
  <div class="col-full push-top">
    <ThreadList v-if="threads.length > 0" :threads="threads" />
    <span v-else>
      No threads found. Create a first thread
      <router-link
        v-if="forum?.id"
        :to="{
          name: 'ThreadCreate',
          params: { forumId: forum.id }
        }"
      >
        here.
      </router-link>
    </span>
  </div>
</template>

<script>
import ThreadList from '@/components/ThreadList.vue'
import { findById } from '@/helpers'
import { mapActions } from 'vuex'
export default {
  components: { ThreadList },
  props: {
    id: {
      requird: true,
      type: String
    }
  },
  data() {
    return {
      threadLoaded: false
    }
  },
  computed: {
    forum() {
      return findById(this.$store.state.forums, this.id)
    },
    threads() {
      if (!this.forum) return []
      if (this.forum.threads) {
        return this.forum.threads.map((threadId) =>
          this.$store.getters.thread(threadId)
        )
      } else {
        return []
      }
    }
  },
  methods: {
    ...mapActions(['fetchForum', 'fetchThreads', 'fetchUsers'])
  },
  async created() {
    const forum = await this.fetchForum({ id: this.id })
    if (forum.threads) {
      const threads = await this.fetchThreads({ ids: forum.threads })
      this.fetchUsers({ ids: threads.map((thread) => thread.userId) })
    }
    this.threadLoaded = true
  }
}
</script>

<style scoped></style>
