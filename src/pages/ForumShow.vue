<template>
  <div v-if="forum && threadLoaded" class="col-full push-top">
    <div class="forum-header">
      <div class="forum-details">
        <h1>{{ forum.name }}</h1>
        <p class="text-lead">{{ forum.description }}</p>
      </div>
      <router-link
        v-if="forum.id"
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
      console.log('this.forum', {
        storedForums: this.$store.state.forums,
        forumId: this.id,
        foundForum: findById(this.$store.state.forums, this.id)
      })
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
  async created() {
    const forum = await this.$store.dispatch('fetchForum', { id: this.id })
    if (forum.threads) {
      const threads = await this.$store.dispatch('fetchThreads', {
        ids: forum.threads
      })
      this.$store.dispatch('fetchUsers', {
        ids: threads.map((thread) => thread.userId)
      })
    }
    this.threadLoaded = true
  }
}
</script>

<style scoped></style>
