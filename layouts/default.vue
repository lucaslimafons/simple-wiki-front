<template>
  <div>
    <Navbar/>

    <b-container class="mt-5">
      <nuxt />
    </b-container>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'

export default {
  components: {
    Navbar
  }
}
</script>
