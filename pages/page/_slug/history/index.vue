<template>
  <div>
    <h3>
      {{ page.title }}
    </h3>

    <table class="table">
      <thead>
        <tr>
          <th>Change description</th>
          <th>Edited at</th>
          <th>Diff</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in page.histories">
          <td>
            {{ item.description || 'No changelog entry' }}
          </td>
          <td>
            {{ item.updated_at | formatDate('MM/DD/YYYY HH:mm') }}
          </td>
          <td>
            <a @click="diff(item.id)">
              Diff
            </a>
          </td>
        </tr>
      </tbody>
    </table>
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
      diff(id) {
          this.$router.push(`/page/${this.page.slug}/history/${id}/diff`);
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
        const page = await pageService.getAllHistoryBySlug(app.context, slug);
        return { page: page.data };
      } catch (e) {
        return { error: e };
      }
    }
  }
};
</script>
