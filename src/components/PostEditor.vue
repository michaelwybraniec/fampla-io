<template>
  <div class="col-full">
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea
          v-model="postCopy.text"
          name=""
          id=""
          cols="30"
          rows="10"
          class="form-input"
        />
      </div>
      <div class="form-actions">
        <button @click="cancel" v-if="post.id" class="btn">Cancel</button>
        <button class="btn-blue">
          {{ post.id ? 'Update Post' : 'Submit post' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    post: { type: Object, default: () => ({ text: null }) }
  },
  data() {
    return {
      postCopy: { ...this.post }
    }
  },
  methods: {
    save() {
      this.$emit('save', { post: this.postCopy }) // access under eventData.post
      this.postCopy.text = ''
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style scroped></style>
