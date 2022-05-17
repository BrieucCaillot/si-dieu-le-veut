<template>
  <div id="css3renderer" class="relative" :ref="(el) => (root = el)">
    <p id="text" class="text-white" style="font-size: 10px">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
      At possimus ex est, voluptate perferendis, tenetur cumque illo, rem repellendus suscipit dolor! Placeat, eos soluta! Molestiae eligendi quasi quibusdam eveniet quae.
    </p>
  </div>
</template>

<script setup lang="ts">
import RendererCSS from '@/class/three/RendererCSS'

const root = ref(null)

onMounted(() => {
  RendererCSS.setup(root.value)
})
</script>
