<template>
  <fieldset class="mb-4">
    <DefaultViewer :index="index" :question="question" />
    <h1 class="mt-3 text-indigo-500 font-bold">
      <div v-if="Array.isArray(question.answer)" v-for="ans in question.answer">
        <div>{{ ans }}</div>
      </div>
      <div v-else>{{ question.answer }}</div>
    </h1>
    <hr class="my-4 border-black" />
  </fieldset>
</template>

<script setup>
import DefaultViewer from "./DefaultViewer.vue";

const { question, index, modelValue } = defineProps({
  question: Object,
  index: Number,
});
</script>

<style scoped></style>
