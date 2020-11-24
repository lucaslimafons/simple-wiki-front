<template>
  <b-overlay :show="isLoading">
    <h3>Search Results</h3>

    <ul v-if="list && list.rows && list.rows.length > 0">
      <li v-for="page in list.rows">
        <a @click="goTo(page.slug)" :class="{ 'text-danger': !page.published }">
          {{ page.title }}
        </a>

        <pre>Last updated {{ page.updated_at | formatDate('MM/DD/YYYY HH:mm') }}</pre>
      </li>
    </ul>

    <span v-else>
      No results.
    </span>
  </b-overlay>
</template>
<script>
import PageService from "@/services/page.service";
export default {
  data() {
    return {
      list: {},
      isLoading: false,
      q: ''
    }
  },
  watch: {
     '$route' (to, from) {
       console.log(to.query.q);
       this.q = to.query.q;
       this.fetchData();
     }
  },
  methods: {
    goTo(slug) {
        this.$router.push(`/page/${slug}`);
    },
    async fetchData() {
      this.isLoading = true;
      try {
        let params = {
          params: {
            q: this.q
          }
        }

        const pageService = new PageService();
        let pages = await pageService.getAll(this, params);
        this.list = pages.data;

        this.isLoading = false;
      } catch (e) {
        this.isLoading = false;
        this.$toast.error(
          "An error occurred getting pages.",
          {
              duration: 3000
          }
        );
      }
    },
  },
  beforeMount() {
    this.q = this.$route.query.q;
    this.fetchData();
  }
}
</script>
