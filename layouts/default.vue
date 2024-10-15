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
    footer.footer
      small Dúvida ou problemas, por favor avise a sua gestão
</template>
<style scoped>
.layout {
  gap: 2.5rem 0;
  grid-template-rows: var(--topbar-height) auto min-content;

  .footer {
    text-align: center;
    padding: .5rem var(--gap);

    small {
      font-size: .8rem
    }

  }
}
</style>
