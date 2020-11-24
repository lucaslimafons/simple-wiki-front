<template>
  <div>
    <h3>{{ page.title }}</h3>

    <h4 class="mb-5">{{ this.history.updated_at | formatDate('MM/DD/YYYY HH:mm') }}</h4>

    <b-row>
      <b-col cols="6">
        <!-- <div class="diff" v-html="page.content"></div> -->
        <div v-html="diff1"></div>
      </b-col>
      <b-col cols="6">
        <div v-html="diff2"></div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import PageService from "@/services/page.service";
import DiffMatchPatch from 'diff-match-patch';
export default {
  data() {
      return {
          page: {},
          history: {},
          diff1: '',
          diff2: ''
      };
  },
  async mounted() {
    if (this.error) {
      this.$toast.error(this.error.errors[0].message, {
          duration: 3000
      });

      this.$router.push('/page');
    } else {
      if (this.page.histories && this.page.histories.length > 0) {
        this.history = this.page.histories[0];

        const dmp = new DiffMatchPatch();

        const diff1 = dmp.diff_main(this.history.content, this.page.content);
        this.diff1 = dmp.diff_prettyHtml(diff1);

        const diff2 = dmp.diff_main(this.page.content, this.history.content);
        this.diff2 = dmp.diff_prettyHtml(diff2);
      }
    }
  },
  async asyncData({context, app}) {
    let slug = app.context.params.slug;
    let id = app.context.params.id;

    if (slug && id) {
      try {
        const pageService = new PageService();
        const page = await pageService.getHistoryById(app.context, slug, id);
        return { page: page.data };
      } catch (e) {
        return { error: e };
      }
    }
  }
};
</script>
