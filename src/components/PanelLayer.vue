<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import { useEditorStore } from '@/store/editor'
import { toRefs } from 'vue'
import Draggable from 'vuedraggable'

const editorStore = useEditorStore()
const { editor, triggerLayerVisibility, triggerLayerLocked, activeLayerId } = toRefs(editorStore)

const elTypeIconMap: Record<string, string> = {
  text: 'carbon:text-small-caps',
  image: 'carbon:image',
  shape: 'ion:shapes-outline',
}
</script>

<template>
  <Draggable
    v-model="editor" item-key="name" handle=".cursor-move"
  >
    <template #item="{ element: layer }">
      <li :key="layer.id" class="group flex items-center gap-2 justify-between hover:bg-slate-100 p-1 my-1 rounded-sm" :class="activeLayerId === layer.id ? 'bg-slate-200' : ''" @click="editorStore.activeLayerId = layer.id">
        <div class="flex items-center">
          <Icon icon="carbon:draggable" class="text-slate-400 cursor-move invisible group-hover:visible" />
          <Icon :icon="elTypeIconMap[layer.type]" class="size-5 mr-2" />
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
    </template>
  </Draggable>
</template>
