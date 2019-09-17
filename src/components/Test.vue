<template>
  <div>
    hello world
    <div>
      <img src="../assets/abc.jpeg" alt="">
    </div>
    <button class='btn' @click='btnMethod()'>点击</button>
  </div>
</template>
<script>
export default {
  methods: {
    btnMethod () {
      // console.log(a.b.f)
    }
  }
}
</script>
<style scoped='scoped' lang="scss">
  @import '../style/test.scss';
</style>
