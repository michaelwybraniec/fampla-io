<template>
  <div v-if="asyncDataStatus_ready" class="container">
    <AppHead>
      <title>{{ forum?.name }}</title>
      <meta property="og:title" :content="forum?.name" />
      <meta name="twitter:title" :content="forum?.name" />
    </AppHead>
    <h3 style="padding: 10px" class="push-top">The</h3>
    <h3
      style="
        background-color: #263959;
        border-radius: 5px;
        color: white;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-right: 14px;
        padding-left: 14px;
      "
      class="push-top"
    >
      fampla.io
    </h3>
    <div>
      <h3 style="padding: 10px; margin-right: 10px" class="push-top">
        is a crazy-fast netlified vue3-firebase app! (michaelwybraniec@me.com)
      </h3>
    </div>

    <category-list :categories="categories" />
  </div>
</template>

<script>
import CategoryList from '@/components/CategoryList'
import { mapActions } from 'vuex'
import asynDataStatus from '@/mixins/asyncDataStatus'
export default {
  name: 'HomePage',
  components: {
    CategoryList
  },
  mixins: [asynDataStatus],
  computed: {
    categories() {
      return this.$store.state.categories.items
    }
  },
  methods: {
    ...mapActions('categories', ['fetchAllCategories']),
    ...mapActions('forums', ['fetchForums'])
  },
  async created() {
    const categories = await this.fetchAllCategories()
    const forumIds = categories.map((category) => category.forums).flat()
    await this.fetchForums({ ids: forumIds })
    this.asyncDataStatus_fetched()
  }
}
</script>
