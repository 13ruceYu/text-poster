<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import { useEditorStore } from '@/store/editor'
import { toRefs } from 'vue'

const editorStore = useEditorStore()
const { editor, triggerLayerVisibility, triggerLayerLocked, activeLayerId } = toRefs(editorStore)

const elTypeIconMap: Record<string, string> = {
  text: 'carbon:text-small-caps',
  image: 'carbon:image',
  shape: 'ion:shapes-outline',
}
</script>

<template>
  <ul>
    <li v-for="layer in editor" :key="layer.id" class="flex items-center gap-2 justify-between hover:bg-slate-200 p-1 my-1 rounded-sm" :class="activeLayerId === layer.id ? 'bg-slate-200' : ''" @click="editorStore.activeLayerId = layer.id">
      <div class="flex items-center gap-2">
        <Icon :icon="elTypeIconMap[layer.type]" class="size-5" />
        <span class="text-xs">{{ layer.name }}</span>
      </div>
      <div>
        <Button size="xs" variant="ghost" @click="triggerLayerVisibility(layer.id)">
          <Icon :icon="layer.visibility ? `carbon:view` : `carbon:view-off`" />
        </Button>
        <Button size="xs" variant="ghost" @click="triggerLayerLocked(layer.id)">
          <Icon :icon="layer.locked ? `carbon:locked` : `carbon:unlocked`" />
        </Button>
      </div>
    </li>
  </ul>
</template>
