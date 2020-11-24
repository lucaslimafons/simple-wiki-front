<template>
  <b-overlay :show="isLoading">
    <h3>All pages</h3>
    <ul>
      <li v-for="page in list.rows">
        <a @click="edit(page.slug)" :class="{ 'text-danger': !page.published }">
          {{ page.title }}
        </a>
      </li>
    </ul>
  </b-overlay>
</template>
<script>
import PageService from "@/services/page.service";
export default {
  data() {
    return {
      list: {},
      isLoading: false
    };
  },
  methods: {
    edit(slug) {
        this.$router.push(`/page/${slug}`);
    },
    async fetchData() {
        this.isLoading = true;
        try {
            const pageService = new PageService();
            let pages = await pageService.getAll(this);
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
      this.fetchData();
  }
};
</script>
