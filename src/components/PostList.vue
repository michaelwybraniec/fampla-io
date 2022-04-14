<template>
  <div class="post-list">
    <div class="post" v-for="post in posts" :key="post.id">
      <div v-if="userById(post.userId)" class="user-info">
        <a href="#" class="user-name">{{ userById(post.userId).name }}</a>

        <a href="#">
          <img
            class="avatar-large"
            :src="userById(post.userId).avatar"
            alt=""
          />
        </a>

        <p class="desktop-only text-small">
          {{ userById(post.userId).postsCount }} posts
        </p>
        <p class="desktop-only text-small">
          {{ userById(post.userId).threadsCount }} threads
        </p>
      </div>

      <div class="post-content">
        <div class="col-full">
          <post-editor
            v-if="editing === post.id"
            :post="post"
            @cancel="cancel"
            @save="handleUpdate"
            @dirty="formIsDirty = true"
            @clean="formIsDirty = false"
          />
          <p v-else>
            {{ post.text }}
          </p>
        </div>
        <a
          v-if="editing !== post.id && post.userId === $store.state.authId"
          @click.prevent="toggleEditMode(post.id)"
          href="#"
          style="margin-left: auto; padding-left: 15px"
          class="link-unstyled"
          title="Edit"
        >
          <fa class="fa-solid fa-md" icon="pencil-alt" />
        </a>
      </div>

      <div class="post-date text-faded">
        <div v-if="post.edited?.at" class="edition-info">edited</div>
        <AppDate v-if="post.publishedAt" :timestamp="post.publishedAt" />
      </div>
    </div>
  </div>
</template>

<script>
import PostEditor from '@/components/PostEditor'
import { mapActions } from 'vuex'
export default {
  components: { PostEditor },
  props: {
    posts: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      editing: null,
      formIsDirty: false
    }
  },
  computed: {
    users() {
      return this.$store.state.users
    }
  },
  methods: {
    ...mapActions(['updatePost']),
    userById(userId) {
      return this.$store.getters.user(userId)
    },
    toggleEditMode(id) {
      if (this.formIsDirty) {
        const confirmed = window.confirm(
          'Are you sure you want to leave? Unsaved changes will be lost!'
        )
        if (!confirmed) return false
        else this.editing = id
      } else {
        this.editing = id === this.editing ? null : id
        // this.formIsDirty = false
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
    handleUpdate(event) {
      this.updatePost(event.post)
      this.editing = null
    }
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
        console.log('TEST postList formIsDirty', this.formIsDirty)
      },
      deep: true
    }
  }
}
</script>

<style scoped></style>
