<template>
  <div v-if="asyncDataStatus_ready" class="col-large push-top">
    <div v-if="thread">
      <h1>
        {{ thread.title }}
        <router-link
          v-if="thread.userId === authUser?.id"
          :to="{ name: 'ThreadEdit', id: this.id }"
          class="btn-green btn-small"
        >
          Edit Thread
        </router-link>
      </h1>
      <p>
        By <a href="#" class="link-unstyled">{{ thread.author?.name }}</a
        >, <AppDate :timestamp="thread.publishedAt" />.
        <span
          style="float: right; margin-top: 2px"
          class="hide-mobile text-faded text-small"
        >
          {{ thread.repliesCount }}
          {{ thread.repliesCount === 1 ? 'reply' : 'replies' }}
          by
          {{ thread.contributorsCount }}
          {{ thread.contributorsCount === 1 ? 'contributor' : 'contributors' }}
        </span>
      </p>

      <post-list :posts="threadPosts" />

      <post-editor
        v-if="authUser"
        @save="addPost"
        @cancel="cancel"
        @dirty="formIsDirty = true"
        @clean="formIsDirty = false"
      />

      <div v-else class="text-center" style="margin-bottom: 50px">
        <router-link
          :to="{ name: 'SignIn', query: { redirectTo: $route.path } }"
        >
          Sign In
        </router-link>
        or
        <router-link
          :to="{ name: 'Register', query: { redirectTo: $route.path } }"
        >
          Register
        </router-link>
        to reply.
      </div>
    </div>
  </div>
</template>

<script>
import PostList from '@/components/PostList'
import PostEditor from '@/components/PostEditor'
import { mapActions, mapGetters } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import useNotifications from '@/composables/useNotifications'
import difference from 'lodash/difference'

export default {
  name: 'ThreadShow',
  components: {
    PostList,
    PostEditor
  },
  setup() {
    const { addNotification } = useNotifications()
    return { addNotification }
  },
  mixins: [asyncDataStatus],
  props: {
    id: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      formIsDirty: false
    }
  },
  computed: {
    ...mapGetters('auth', ['authUser']),
    threads() {
      return this.$store.state.threads.items
    },
    posts() {
      return this.$store.state.posts.items
    },
    thread() {
      return this.$store.getters['threads/thread'](this.id)
    },
    threadPosts() {
      return this.posts.filter((post) => post.threadId === this.id)
    }
  },
  methods: {
    ...mapActions('threads', ['fetchThread']),
    ...mapActions('users', ['fetchUsers']),
    ...mapActions('posts', ['fetchPosts', 'createPost']),
    async fetchPostsWithUsers(ids) {
      // fetch the posts
      const posts = await this.fetchPosts({
        ids,
        onSnapshot: ({ isLocal, previousItem }) => {
          console.log(isLocal)
          if (
            !this.asyncDataStatus_ready ||
            isLocal ||
            (previousItem?.edited && !previousItem?.edited?.at)
          ) {
            return
          }
          this.addNotification({
            message: 'Thread recently updated',
            timeout: 5000
          })
        }
      })
      // fetch the users associated with the posts
      const users = posts.map((post) => post.userId).concat(this.thread.userId)
      await this.fetchUsers({ ids: users })
    },
    addPost(eventData) {
      const post = {
        ...eventData.post,
        threadId: this.id
      }
      this.createPost(post)
    }
  },
  cancel() {
    if (this.formIsDirty) {
      const confirmed = window.confirm(
        'Are you sure you want to leave? Unsaved changes will be lost!'
      )
      if (!confirmed) return false
      else this.editing = null
    } else {
      this.editing = null
    }
  },
  async created() {
    // fetch the thread
    const thread = await this.fetchThread({
      id: this.id,
      onSnapshot: async ({ isLocal, item, previousItem }) => {
        if (!this.asyncDataStatus_ready || isLocal) return
        const newPosts = difference(item.posts, previousItem.posts)
        const hasNewPosts = newPosts.length > 0
        if (hasNewPosts) {
          await this.fetchPostsWithUsers(newPosts)
        } else {
          this.addNotification({
            message: 'Thread recently updated',
            timeout: 5000
          })
        }
      }
    })
    await this.fetchPostsWithUsers(thread.posts)
    this.asyncDataStatus_fetched()
  },
  beforeRouteLeave() {
    if (this.formIsDirty) {
      const confirmed = window.confirm(
        'Are you sure you want to leave? Unsaved changes will be lost!'
      )
      if (!confirmed) return false
    }
  },
  watch: {
    formIsDirty: {
      handler() {
        console.log('TEST ThreadShow formIsDirty', this.formIsDirty.text)
      },
      deep: true
    }
  }
}
</script>
