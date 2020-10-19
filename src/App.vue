<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
    mounted(){
      this.$mqtt.subscribe('tekkoma/#');
    }
}
</script>
