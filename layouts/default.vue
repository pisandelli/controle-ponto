<script lang='ts' setup>
/**
* @name 'DefaultLayout'
* @version 1.0.0
*/
</script>

<template lang="pug">
AConfigProvider(:theme='defaultTheme')
  BasicLayout.layout
    header
      WTopbar
    main
      slot
    footer
      p FOOTER
</template>
<style scoped>
.layout {
  gap: 2.5rem 0;
  grid-template-rows: var(--topbar-height) auto min-content;
}
</style>
