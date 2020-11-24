<template>
  <div>
    <Form :slug="this.slug"></Form>
  </div>
</template>
<script>
  import Form from '~/components/page/Form'
  export default {
    components: {
      Form
    },
    data() {
      return {
      }
    },
    async asyncData({context, app}) {
      let slug = app.context.params.slug;

      if (slug) {
        return { slug };
      }
    }
  }
</script>
