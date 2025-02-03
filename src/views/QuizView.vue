<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import type { Option } from '../../lib/types/questionType';
  import getAllQuizes from '../../lib/getQuizes'; 
  import Results from '../components/Results.vue';
  
  const route = useRoute();
  const quiz = getAllQuizes().find(quiz => quiz.id === Number(route.params.id))!

  const currentQuestionIndex = ref<number>(0);
  const currentQuestion = ref(quiz.questions[currentQuestionIndex.value]);
  const selectedOption = ref<Option | null>(null);
  const totalQuestionsRight = ref<number>(0);
  const showResults = ref<boolean>(false);
  
  const handleSelectedOption = (option: Option) => {
    selectedOption.value = option;
  }
  
  const handleNextQuestion = () => {
    if(selectedOption.value?.isCorrect){
      totalQuestionsRight.value++
    }
    
    if(quiz.questions.length - 1 === currentQuestionIndex.value){
      showResults.value = true;
    }

    currentQuestionIndex.value++
    currentQuestion.value = quiz.questions[currentQuestionIndex.value];
    selectedOption.value = null;
  }
  
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

    <div>
      <div v-if="!showResults" class="mt-5">
        <h2 class="text-2xl opacity-70">{{ currentQuestion.question }}</h2>
        
        <ul class="mt-5">
          <li 
            v-for="(option, index) in currentQuestion.options" 
            :key="option.id"
            :class="{
              'flex items-center w-full border border-amber-200 my mb-3 rounded-2xl overflow-hidden cursor-pointer hover:shadow-md hover:shadow-amber-200' : true,
              'shadow-md shadow-amber-200' : selectedOption && selectedOption.id === option.id
            }" 
            @click="handleSelectedOption(option)" 
            :data-index="index"
          >
            <span class="p-4 bg-amber-200">{{ option.label }}</span>
            <span class="p-4 bg-gray-200 w-full">{{ option.text }}</span>
          </li>
        </ul>
      </div>
      <Results
        v-else
        :questionsCorrect="totalQuestionsRight"
        :totalQuestion="quiz.questions.length"
      />
    </div>

    <Transition name="button">
      <button 
        v-if="selectedOption !== null" 
        class="bg-amber-200 hover:bg-amber-400 cursor-pointer py-2 px-4 rounded-2xl ml-auto flex items-center"
        @click="handleNextQuestion"
      > 
        <span class="mr-2">Next</span>
        <span><font-awesome-icon icon="fa-solid fa-arrow-right" /></span>
      </button>
    </Transition>

  </div>
</template>

<style scoped>
  .button-enter-from{
    opacity: 0;
    transform: translateY(20px);
  }

  .button-enter-active{
    transition: all 0.4s ease;
  }
</style>
