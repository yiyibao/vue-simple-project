<template>
  <div>
    hello world
    <p>{{hello}}</p>ddd
    <div>
      <img src="../assets/abc.jpeg" alt="">
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      hello: 'this is Test1'
    }
  }
}
</script>
<style scoped='scoped' lang="scss">
  @import '../style/test.scss';
</style>
