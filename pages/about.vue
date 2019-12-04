<template>
  <div>
    <NuxtLink :to="'/'">
      跳转到index
    </NuxtLink>
    <editor-component />
  </div>
</template>

<script>
import EditorComponent from '@/components/editor'
export default {
  components: {
    EditorComponent
  }
}
</script>
