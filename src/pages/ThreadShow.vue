<template>
  <div class="col-large push-top">
    <h1>
      {{ thread.title }}
      <router-link
        sciped="button"
        class="btn-green btn-small"
        :to="{ name: 'ThreadEdit', id }"
      >
        Edit Tread
      </router-link>
    </h1>

    <p>
      By
      <a href="#" class="link-unstyled">
        {{ thread.author.name }}
      </a>
      , <app-date :timestamp="thread.publishedAt" />
      <span
        style="float: right; margin-top: 2px"
        class="hide-mobile text-faded text-small"
      >
        {{ thread.repliesCount }} replies by
        {{ thread.contributorsCount }} contributors
      </span>
    </p>

    <post-list-vue :posts="threadPosts" />
    <post-editor-vue @save="addPost" />
  </div>
</template>

<script>
import PostListVue from '@/components/PostList.vue'
import PostEditorVue from '@/components/PostEditor.vue'
import AppDate from '@/components/AppDate.vue'
export default {
  name: 'ThreadShow',
  components: {
    PostListVue,
    PostEditorVue,
    AppDate
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    threads() {
      return this.$store.state.threads
    },
    posts() {
      return this.$store.state.posts
    },
    thread() {
      return this.$store.getters.thread(this.id)
    },
    threadPosts() {
      return this.posts.filter((post) => post.threadId === this.id)
    }
  },
  methods: {
    addPost(eventData) {
      const post = {
        ...eventData.post,
        threadId: this.id
      }
      this.$store.dispatch('createPost', post)
    }
  }
}
</script>

<style scoped></style>
