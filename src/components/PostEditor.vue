<template>
  <div class="col-full">
    <VeeForm @submit="save" :key="formKey">
      <AppFormField
        label="Post"
        as="textarea"
        name="text"
        v-model="postCopy.text"
        rows="10"
        cols="30"
        rules="required"
      />
      <div class="form-actions">
        <button
          @click.prevent="$emit('cancel')"
          v-if="post.id"
          class="btn btn-ghost"
        >
          Cancel
        </button>
        <button class="btn-blue">
          {{ post.id ? 'Update Post' : 'Submit post' }}
        </button>
      </div>
    </VeeForm>
  </div>
</template>

<script>
export default {
  props: {
    post: { type: Object, default: () => ({ text: null }) }
  },
  data() {
    return {
      postCopy: { ...this.post },
      formKey: Math.random()
    }
  },
  methods: {
    save() {
      this.$emit('save', { post: this.postCopy }) // access under eventData.post
      this.postCopy.text = ''
      this.formKey = Math.random()
    }
  }
}
</script>

<style scoped></style>
