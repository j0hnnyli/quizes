<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import getAllQuizes from '../../lib/getQuizes';

  const route = useRoute();
  
  const quiz = getAllQuizes().find(quiz => quiz.id === Number(route.params.id))!

  const currentQuestionIndex = ref<number>(0);
  // const totalQuestionsRight = ref(0);
  const currentQuestion = ref(quiz.questions[currentQuestionIndex.value])
  
  const progress = computed(() => `${currentQuestionIndex.value/quiz.questions.length * 100}%`) 
</script> 

<template>
  <div>
    <div class="flex justify-between items-center">
      <h2 class="text-5xl font-bold">{{ quiz.name }}</h2>
      
      <div>
        <h2 class="text-xl font-bold">Question {{ currentQuestionIndex }} / {{ quiz.questions.length }}</h2>
        <div class="w-[200px] border-1 border-amber-200 h-10 rounded-2xl overflow-hidden">
          <div class="h-full bg-amber-200" :style="{width: progress}"></div>
        </div>
      </div>
    </div>

    <div class="mt-5">
      <h2 class="text-2xl opacity-70">{{ currentQuestion.question }}</h2>

      <ul class="mt-5">
        <li 
          v-for="option in currentQuestion.options" 
          :key="option.id"
          class="flex items-center w-full border border-amber-200 my mb-3 rounded-2xl overflow-hidden cursor-pointer hover:shadow-md hover:shadow-amber-200"
        >
          <span class="p-4 bg-amber-200">{{ option.label }}</span>
          <span class="p-4 bg-gray-200 w-full">{{ option.text }}</span>
        </li>
      </ul>
    </div>

  </div>
</template>