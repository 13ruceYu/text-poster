<script lang="ts" setup>
import ToggleColorMode from './ToggleColorMode.vue'
</script>

<template>
  <nav class="border-b px-2 shadow-sm flex items-center justify-between">
    <div class="logo flex items-center justify-center text-theme">
      <img src="@/assets/logo.svg" alt="logo">
      <div class="text-2xl font-bold ml-2">
        Text Poster
      </div>
    </div>
    <div>
      <!-- <Icon class="size-7 p-1 rounded-sm cursor-pointer hover:bg-slate-100" icon="carbon:light" /> -->
      <ToggleColorMode />
    </div>
  </nav>
</template>
