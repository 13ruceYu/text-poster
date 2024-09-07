<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/vue'
import { useColorMode } from '@vueuse/core'

// Pass { disableTransition: false } to enable transitions
const mode = useColorMode()
</script>

<template>
  <Button variant="ghost" size="sm" @click="mode === 'dark' ? mode = 'light' : mode = 'dark'">
    <Icon v-show="mode === 'light'" icon="radix-icons:moon" />
    <Icon v-show="mode === 'dark'" icon="radix-icons:sun" />
  </Button>
</template>
