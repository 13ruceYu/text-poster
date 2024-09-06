<script>
import Moveable from 'vue3-moveable'
import { ref } from 'vue'

export default {
  components: { Moveable },
  setup() {
    const maxSnapElementGuidelineDistance = 100
    const maxSnapElementGapDistance = 80
    const targetRef = ref(null)
    const moveableRef = ref(null)
    const onDrag = (e) => {
      e.target.style.transform = e.transform
    }
    const onScale = (e) => {
      e.target.style.transform = e.drag.transform
    }
    return {
      targetRef,
      moveableRef,
      maxSnapElementGuidelineDistance,
      maxSnapElementGapDistance,
      onDrag,
      onScale,
    }
  },
}
</script>

<template>
  <div class="root">
    <div
      class="container"
      style="left: 100px;top: 100px;width: 500px;height: 500px;border: 1px solid #ccc;"
    >
      <div
        class="target"
        style="width: 100px;height: 100px;left: 550px;top: 150px;"
      >
        Element4
      </div>
      <div
        ref="targetRef"
        class="target"
        style="width: 150px;height: 150px;"
      >
        Target
      </div>
      <Moveable
        ref="moveableRef"
        :target="targetRef"
        :draggable="true"
        :snappable="true"
        :element-guidelines="['.target']"
        :snap-directions="({ top: true, left: true, bottom: true, right: true, center: true, middle: true })"
        :element-snap-directions="({ top: true, left: true, bottom: true, right: true, center: true, middle: true })"
        :max-snap-element-guideline-distance="maxSnapElementGuidelineDistance"
        :max-snap-element-gap-distance="maxSnapElementGapDistance"
        @drag="onDrag"
        @scale="onScale"
      />
    </div>
  </div>
</template>
