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
    <div class="col-full push-top">
      <div v-if="asyncDataStatus_ready" class="col-full">
        <thread-list v-if="threads.length > 0" :threads="threads" />
        <v-pagination
          v-model="page"
          :pages="totalPages"
          active-color="#57AD8D"
          @update:modelValue="updateHandler"
        />
      </div>
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
  </div>
</template>

<script>
import ThreadList from '@/components/ThreadList.vue'
import { findById } from '@/helpers'
import { mapActions } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'
export default {
  name: 'ForumPage',
  components: { ThreadList },
  mixins: [asyncDataStatus],
  props: {
    id: {
      requird: true,
      type: String
    }
  },
  data() {
    return {
      threadLoaded: false,
      page: 1,
      perPage: 10
    }
  },
  computed: {
    forum() {
      return findById(this.$store.state.forums.items, this.id)
    },
    threads() {
      if (!this.forum) return []
      return this.$store.state.threads.items
        .filter((thread) => thread.forumId === this.forum.id)
        .map((thread) => this.$store.getters['threads/thread'](thread.id))
    },
    threadCount() {
      return this.forum.threads.length
    },
    totalPages() {
      if (!this.threadCount) return 0
      return Math.ceil(this.threadCount / this.perPage)
    }
  },
  methods: {
    ...mapActions('forums', ['fetchForum']),
    ...mapActions('threads', ['fetchThreadsByPage']),
    ...mapActions('users', ['fetchUsers'])
  },
  async created() {
    const forum = await this.fetchForum({ id: this.id })
    if (forum.threads) {
      const threads = await this.fetchThreadsByPage({
        ids: forum.threads,
        page: this.page,
        perPage: this.perPage
      })
      await this.fetchUsers({ ids: threads.map((thread) => thread.userId) })
      this.asyncDataStatus_fetched()
    }
    this.threadLoaded = true
  },
  watch: {
    async page(page) {
      const threads = await this.fetchThreadsByPage({
        ids: this.forum.threads,
        page: this.page,
        perPage: this.perPage
      })
      await this.fetchUsers({ ids: threads.map((thread) => thread.userId) })
    }
  }
}
</script>

<style scoped></style>
