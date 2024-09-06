<script lang="ts" setup>
const props = defineProps<{
  activeElementData: any
}>()
</script>

<template>
  <div class="panel-props">
    <div>
      <p class="mb-2">
        Text
      </p>
      <Textarea v-model="props.activeElementData.text" class="mb-2" />
      <div class="grid grid-cols-[70px_1fr] items-center gap-2">
        <Label class="text-xs">Align</Label>
        <ToggleGroup v-model="props.activeElementData.align" size="sm" type="single" class="justify-normal">
          <ToggleGroupItem value="left">
            <Icon class="size-5" icon="carbon:text-align-left" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center">
            <Icon class="size-5" icon="carbon:text-align-center" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right">
            <Icon class="size-5" icon="carbon:text-align-right" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
    <Separator class="my-4" />
    <div>
      <p class="mb-2">
        Layout
      </p>
      <div class="grid grid-cols-[70px_1fr_1fr] items-center gap-2 mb-2">
        <Label class="text-sm">Size</Label>
        <Input v-model="props.activeElementData.size.width" class="h-8" />
        <Input v-model="props.activeElementData.size.height" class="h-8" />
      </div>
      <div class="grid grid-cols-[70px_1fr_1fr] items-center gap-2">
        <Label class="text-sm">Position</Label>
        <Input v-model="props.activeElementData.position.x" class="h-8" />
        <Input v-model="props.activeElementData.position.y" class="h-8" />
      </div>
    </div>
    <Separator class="my-4" />
    <div>
      <p>Color</p>
      <div class="grid grid-cols-[70px_1fr] items-center gap-2">
        <Label class="text-sm">Fill</Label>
        <Input v-model="props.activeElementData.fill" type="color" class="h-8" />
      </div>
      <div class="grid grid-cols-[70px_1fr] items-center gap-2">
        <Label class="text-sm">Color</Label>
        <Input v-model="props.activeElementData.color" type="color" class="h-8" />
      </div>
    </div>
  </div>
</template>
