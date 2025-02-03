<script setup lang="ts">
  import { defineProps } from 'vue';
  import gsap from 'gsap'

  type Props = {
    totalQuestion: number,
    questionsCorrect: number,
  }

  const {totalQuestion, questionsCorrect} = defineProps<Props>();

  const percentage = (questionsCorrect/totalQuestion) * 100

  const beforeEnter = (el: Element) => {
    const htmlElement = el as HTMLElement;
    htmlElement.style.opacity = '0'
    htmlElement.style.transform = 'scale(0)'
  }

  const enter = (el: Element) => {
    const htmlElement = el as HTMLElement;
    gsap.to(htmlElement, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
    })
  }
</script>

<template>
  <Transition 
    appear
    @before-enter="beforeEnter"
    @enter="enter"
  >
    <div class="flex flex-col items-center justify-center mt-5 p-10">
      <h2 class="text-4xl tracking-widest font-bold ">Results</h2>
      <h4 :class="{
        'text-8xl my-5' : true,
        'text-red-500' : percentage < 60,
        'text-green-500' : percentage > 60,
      }">
        {{ percentage }}%
      </h4>
      <h3 class="text-xl">
        <span 
          :class="{
            'text-red-500' : percentage < 60,
            'text-green-500' : percentage >= 60,
          }"
        >
          {{ questionsCorrect }}
        </span> / 
        <span>{{ totalQuestion }}</span>
      </h3>
  
      <RouterLink to="/" class="my-5 py-2 px-4 bg-amber-200 hover:bg-amber-400 rounded-2xl">Back to Home</RouterLink>
    </div>
  </Transition>
</template>
