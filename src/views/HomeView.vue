<script setup lang="ts">
  import getAllQuizes from '../../lib/getQuizes'
  import Card from '../components/Card.vue';

  const quizes = getAllQuizes();
  
</script>

<template >
  <div>
    <h1 class="text-5xl font-bold">Quizes</h1>

    <div class="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      <Card 
        v-for="quiz in quizes" 
        :key="quiz.id"
        :img="quiz.img"
        :title="quiz.name"
        :id="quiz.id"
      />
    </div>
  </div>
</template>

