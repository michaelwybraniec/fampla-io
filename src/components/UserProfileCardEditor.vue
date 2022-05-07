<template>
  <div class="profile-card">
    <VeeForm @submit="save">
      <p class="text-center avatar-edit">
        <label for="avatar">
          <app-avatar-img
            :src="activeUser.avatar"
            :alt="`${user.name} profile picture`"
            class="avatar-xlarge img-update"
          />
          <div class="avatar-upload-overlay">
            <app-spinner
              v-if="uploadingImage"
              color="white"
              :style="{ padding: '18px', paddingTop: '25px' }"
            />
            <fa v-else icon="camera" size="4x" />
          </div>
          <input
            v-show="false"
            type="file"
            id="avatar"
            accept="image/*"
            @change="handleAvatarUpload"
          />
        </label>
      </p>

      <user-profile-card-editor-random-avatar
        @hit="activeUser.avatar = $event"
      />

      <AppFormField
        label="Username"
        name="username"
        v-model="activeUser.username"
        :rules="`required|unique:users,username,${user.username}`"
      />
      <AppFormField
        label="Full Name"
        name="name"
        v-model="activeUser.name"
        rules="required"
      />
      <AppFormField
        label="Bio"
        name="bio"
        as="textarea"
        v-model="activeUser.bio"
        placeholder="Write a few words about yourself."
      />
      <div class="stats">
        <span>{{ user.postsCount }} posts</span>
        <span>{{ user.threadsCount }} threads</span>
      </div>

      <hr />

      <AppFormField
        label="Website"
        name="website"
        v-model="activeUser.website"
        rules="url"
      />
      <AppFormField
        label="Email"
        name="email"
        v-model="activeUser.email"
        :rules="`required|email|unique:users,email,${user.email}`"
      />
      <AppFormField
        label="Location"
        name="location"
        v-model="activeUser.location"
      />

      <div class="btn-group space-between">
        <button
          :disabled="processing"
          class="btn-ghost"
          @click.prevent="cancel"
        >
          Cancel
        </button>
        <button :disabled="processing" type="submit" class="btn-blue">
          <app-spinner
            :style="{ paddingLeft: '6px', paddingRight: '6px' }"
            v-if="processing"
            size="sm"
          />
          <span v-else>Save</span>
        </button>
      </div>
    </VeeForm>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import UserProfileCardEditorRandomAvatar from './UserProfileCardEditorRandomAvatar'
export default {
  components: { UserProfileCardEditorRandomAvatar },
  name: 'UserProfileCardEditor',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      processing: false,
      uploadingImage: false,
      activeUser: { ...this.user }
    }
  },
  methods: {
    ...mapActions('auth', ['uploadAvatar']),
    async handleAvatarUpload(e) {
      this.uploadingImage = true
      const file = e.target.files[0]
      const uploadedImage = await this.uploadAvatar({ file })
      this.activeUser.avatar = uploadedImage || this.activeUser.avatar
      this.uploadingImage = false
    },
    async handleRandomAvatarUpload() {
      const randomAvatarGenerated =
        this.activeUser.avatar.startsWith('https://pixabay')
      if (randomAvatarGenerated) {
        const image = await fetch(this.activeUser.avatar)
        const blob = await image.blob()
        this.activeUser.avatar = await this.uploadAvatar({
          file: blob,
          filename: 'random'
        })
      }
    },
    async save() {
      this.processing = true
      await this.handleRandomAvatarUpload()
      this.$store.dispatch('users/updateUser', { ...this.activeUser })
      this.$router.push({ name: 'Profile' })
      this.processing = false
    },
    cancel() {
      this.$router.push({ name: 'Profile' })
    }
  }
}
</script>
<style scoped lang=""></style>
