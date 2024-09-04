<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

// Pass { disableTransition: false } to enable transitions
const mode = useColorMode()
</script>

<template>
  <Button variant="ghost" size="sm" @click="mode === 'dark' ? mode = 'light' : mode = 'dark'">
    <Icon v-show="mode === 'light'" icon="radix-icons:moon" />
    <Icon v-show="mode === 'dark'" icon="radix-icons:sun" />
  </Button>
</template>
