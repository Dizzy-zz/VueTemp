<template>
  <div class="main">
    <Test/>
  </div>
</template>

<script>
  import Test from './test';

  export default {
    data: function () {
      return {
        test: 'test',
      }
    },
    components: {
      Test,
    }
  }
</script>

<style lang="scss" scoped>
  .main {
    width: 75px;
    height: 75px;
    background-color: black;
    color: #fff;
  }
</style>