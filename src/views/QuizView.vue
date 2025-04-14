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
    
    if(option.isCorrect){
      totalQuestionsRight.value++
    }
  }
  
  const handleNextQuestion = () => { 
    if(quiz.questions.length - 1 === currentQuestionIndex.value){
      showResults.value = true;
    }

    if(currentQuestionIndex.value < 9){
      currentQuestionIndex.value++
    }
    
    currentQuestion.value = quiz.questions[currentQuestionIndex.value];
    selectedOption.value = null;
  }
  
  const progress = computed(() => `${(currentQuestionIndex.value + 1)/quiz.questions.length * 100}%`) 
</script> 


<template>
  <div>
    <div class="flex flex-col md:flex-row md:justify-between md:items-center">
      <h2 class="text-5xl font-bold">{{ quiz.name }}</h2>
      
      <div>
        <h2 class="text-xl font-bold">Question {{ currentQuestionIndex + 1 }} / {{ quiz.questions.length }}</h2>
        <div class="w-[200px] border-1 border-amber-200 h-10 rounded-2xl overflow-hidden">
          <div class="h-full bg-amber-200" :style="{width: progress}"></div>
        </div>
      </div>
    </div>

    <div>
      <div v-if="!showResults" class="mt-5">
        <h2 class="text-xl md:text-2xl opacity-70">{{ currentQuestion.question }}</h2>
        
        <div class="mt-5">
          <button
            v-for="option in currentQuestion.options" 
            :key="option.id"
            :class="{
              'flex items-center w-full border border-amber-200 bg-amber-200 my mt-3 rounded-2xl overflow-hidden cursor-pointer' : true,
              'hover:shadow-md hover:shadow-amber-200' : !selectedOption,
              'shadow-md shadow-amber-200' : selectedOption && selectedOption.id === option.id,
              'bg-green-500' : selectedOption && option.isCorrect,
              'bg-red-500' : selectedOption && !option.isCorrect,
            }" 
            :disabled="selectedOption !== null"
            @click="handleSelectedOption(option)" 
          >
            <span class="p-4">{{ option.label }}</span>
            <span class="p-4 bg-gray-200 w-full text-left">{{ option.text }}</span>
          </button>
        </div>
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
        class="bg-amber-200 hover:bg-amber-400 cursor-pointer py-2 px-4 rounded-2xl ml-auto flex items-center mt-3"
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
