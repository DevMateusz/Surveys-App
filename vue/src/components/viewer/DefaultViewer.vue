<template>
  <div>
    <legend class="text-base font-medium text-gray-900">
      {{ index + 1 }}. {{ question.question }}
    </legend>
    <p class="text-gray-500 text-sm">
      {{ question.description }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  index: Number,
  question: Object,
});
</script>

<style></style>
