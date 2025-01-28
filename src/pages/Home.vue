<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
</script>

<template>
  <div>
    <nav class="border border-slate-300 h-14 flex items-center justify-between px-2">
      <div class="logo flex items-center justify-center text-theme">
        <img src="/logo.svg" alt="logo">
        <div class="text-2xl font-bold ml-2">
          Text Poster
        </div>
      </div>
      <div>
        <Button>Create New</Button>
      </div>
    </nav>
    <main>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-screen-lg mx-auto p-4">
        <Card>
          <CardContent class="p-2">
            <img src="@/assets/bg-image/blue-dot.png" alt="hi">
          </CardContent>
        </Card>
        <Card>
          <CardContent class="p-2">
            <img src="@/assets/bg-image/red-dot.png" alt="lo">
          </CardContent>
        </Card>
      </div>
    </main>
  </div>
</template>
