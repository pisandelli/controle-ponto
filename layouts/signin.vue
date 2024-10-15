<script lang='ts' setup>
/**
* @name 'SigninLayout'
* @version 1.0.0
*/
</script>

<template lang="pug">
BasicLayout.layout
  main
    .panel
      .column
        .call
          Logo.logo
          h1.title Sistema de ponto
      .column
        .call
          slot
  footer.footer
    small Dúvida ou problemas, por favor avise a sua gestão
</template>
<style scoped>
.logo {
  margin-block-end: 2rem;
  inline-size: 25rem;
}

.title {
  font-size: var(--font-size-big);
  color: var(--color-primary);
  font-weight: var(--weight-bold);
  text-align: center;
}

.panel {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;
  min-block-size: 100%;

  .column {
    display: flex;
    padding-inline: 1rem;
  }
}

.call {
  margin-inline: auto;
  place-self: center;
}


.layout {
  gap: 2.5rem 0;
  grid-template-rows: auto min-content;

  .footer {
    text-align: center;
    padding: .5rem var(--gap);

    small {
      font-size: .8rem
    }

  }
}
</style>
