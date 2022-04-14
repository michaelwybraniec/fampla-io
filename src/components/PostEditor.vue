<template>
  <div class="col-full">
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea
          v-model="form.postCopy.text"
          name=""
          id=""
          cols="30"
          rows="10"
          class="form-input"
        />
      </div>
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
      form: { postCopy: { ...this.post } }
    }
  },
  methods: {
    save() {
      this.$emit('clean')
      this.$emit('save', { post: this.form.postCopy })
      this.form.postCopy.text = ''
      this.form.post.text = ''
    }
  },
  watch: {
    form: {
      handler() {
        console.log('TEST PostEditor form', this.form.postCopy.text, this.post)
        if (this.form.postCopy.text !== this.post) {
          this.$emit('dirty')
        } else {
          this.$emit('clean')
        }
      },
      deep: true
    }
  }
}
</script>

<style scroped></style>
