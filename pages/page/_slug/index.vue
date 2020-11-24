<template>
  <div>
    <h3>
      {{ page.title }}
    </h3>

    <div v-if="!page.published">
      <b-alert show>This page doesn't exist yet.</b-alert>
    </div>

    <div v-else>
      <div v-html="$md.render(page.content)"></div>
    </div>

    <b-button type="button" @click="edit()" variant="primary">Edit</b-button>
    <b-button type="button" @click="history()" variant="default">View History</b-button>
  </div>
</template>
<script>
import PageService from "@/services/page.service";
export default {
  data() {
      return {
          page: {},
          isLoading: false
      };
  },
  methods: {
      edit() {
          this.$router.push(`/page/${this.page.slug}/edit`);
      },
      history() {
          this.$router.push(`/page/${this.page.slug}/history`);
      }
  },
  async mounted() {
    if (this.error) {
      this.$toast.error(this.error.errors[0].message, {
          duration: 3000
      });

      this.$router.push('/page');
    }
  },
  async asyncData({context, app}) {
    let slug = app.context.params.slug;

    if (slug) {
      try {
        const pageService = new PageService();
        const page = await pageService.getBySlug(app.context, slug);
        return { page: page.data };
      } catch (e) {
        return { error: e };
      }
    }
  }
};
</script>
