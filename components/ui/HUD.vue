<template>
  <div id="hud">
    <p>
      Nombre d'ordalies :
      <span>{{ score }}</span>
    </p>
    <p>
      Difficulté actuelle :
      <span>{{ difficulty.split('_').join(' ') }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
const { score, difficulty } = useHUD()
</script>
