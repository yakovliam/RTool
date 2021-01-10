<template>
  <div class="page">
    Client Options - For client with id: {{ $route.params.id }}
  </div>
</template>

<script>

export default {
  name: 'ClientOptions',
};

</script>

<style lang="scss" scoped>
.page {
  // Background color
  background-color: #fafbfc;
}
</style>
