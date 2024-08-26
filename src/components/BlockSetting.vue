<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { IContentBlock } from '@/types'

const props = defineProps<{
  block: IContentBlock
}>()
</script>

<template>
  <Popover>
    <PopoverTrigger>
      <Button variant="outline" size="xs">
        <Icon icon="carbon:color-palette" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-80">
      <div class="grid grid-gap-4">
        <div class="space-y-2">
          <div class="grid grid-cols-3 items-center gap-4">
            <Label>Font Size</Label>
            <!-- eslint-disable-next-line vue/no-mutating-props -->
            <Select v-model="props.block.style.fontSize">
              <SelectTrigger class="col-span-2 h-8">
                <SelectValue :default-value="props.block.style.fontSize" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12px">
                  12px
                </SelectItem>
                <SelectItem value="16px">
                  16px
                </SelectItem>
                <SelectItem value="32px">
                  32px
                </SelectItem>
                <SelectItem value="48px">
                  48px
                </SelectItem>
                <SelectItem value="64px">
                  64px
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <Label>Margin Top</Label>
            <!-- eslint-disable-next-line vue/no-mutating-props -->
            <Select v-model="props.block.style.marginTop">
              <SelectTrigger class="col-span-2 h-8">
                <SelectValue :default-value="props.block.style.marginTop" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0px">
                  0px
                </SelectItem>
                <SelectItem value="16px">
                  16px
                </SelectItem>
                <SelectItem value="32px">
                  32px
                </SelectItem>
                <SelectItem value="48px">
                  48px
                </SelectItem>
                <SelectItem value="64px">
                  64px
                </SelectItem>
                <SelectItem value="128px">
                  128px
                </SelectItem>
                <SelectItem value="192px">
                  192px
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <Label>Text Align</Label>
            <!-- eslint-disable-next-line vue/no-mutating-props -->
            <Tabs v-model="props.block.style.textAlign" default-value="left">
              <TabsList>
                <TabsTrigger value="left">
                  left
                </TabsTrigger>
                <TabsTrigger value="center">
                  center
                </TabsTrigger>
                <TabsTrigger value="right">
                  right
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
