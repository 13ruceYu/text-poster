<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useEditorStore } from '@/store/editor'

const editorStore = useEditorStore()
</script>

<template>
  <nav class="h-16 px-2 flex items-center gap-4 justify-between border border-slate-300">
    <div class="project-name">
      name
    </div>
    <div class="center flex items-center gap-2">
      <Button variant="ghost" class="flex-col h-auto py-1" @click="editorStore.addNewLayer('text')">
        <Icon class="size-6" icon="carbon:text-small-caps" />
        <p class="text-xs font-light">
          Text
        </p>
      </Button>
      <Button variant="ghost" class="flex-col h-auto py-1">
        <Icon class="size-6" icon="ion:shapes-outline" />
        <p class="text-xs font-light">
          Shape
        </p>
      </Button>
      <Button variant="ghost" class="flex-col h-auto py-1">
        <Icon class="size-6" icon="carbon:image" />
        <p class="text-xs font-light">
          Image
        </p>
      </Button>
      <Separator class="h-8" orientation="vertical" />
      <Button variant="ghost" class="flex-col h-auto py-1">
        <Icon class="size-6" icon="carbon:view" />
        <p class="text-xs font-light">
          Hide
        </p>
      </Button>
      <Button variant="ghost" class="flex-col h-auto py-1">
        <Icon class="size-6" icon="carbon:trash-can" />
        <p class="text-xs font-light">
          Delete
        </p>
      </Button>
      <Separator class="h-8" orientation="vertical" />
      <Button variant="ghost" class="flex-col h-auto py-1">
        <Icon class="size-6" icon="carbon:undo" />
        <p class="text-xs font-light">
          Undo
        </p>
      </Button>
      <Button variant="ghost" class="flex-col h-auto py-1">
        <Icon class="size-6" icon="carbon:redo" />
        <p class="text-xs font-light">
          Redo
        </p>
      </Button>
    </div>
    <div class="right flex gap-2">
      <Button size="sm">
        Export
      </Button>
      <Button size="sm">
        Save
      </Button>
    </div>
  </nav>
</template>
