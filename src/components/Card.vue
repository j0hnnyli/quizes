<script setup lang="ts">
import { defineProps } from "vue";
import { RouterLink } from "vue-router";

type Props = {
  title: string,
  id: number,
  img: string
}

const { title, id, img } = defineProps<Props>();
</script>

<template>
  <RouterLink
    :to="`/quiz/${id}`"
    class="bg-amber-200 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-amber-200"
  >
    <div class="w-full h-[150px]">
      <img :src="img" :alt="title" class="w-full h-full" />
    </div>
    <div class="p-2">
      <h2 class="text-2xl tracking-widest">{{ title }}</h2>
      <p>10 Questions</p>
    </div>
  </RouterLink>
</template>
