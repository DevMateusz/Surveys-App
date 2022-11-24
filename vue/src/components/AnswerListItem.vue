<template>
  <div
    class="flex justify-between py-4 px-6 shadow-md bg-white hover:bg-grey-50 h-[110px]"
  >
    <div class="flex flex-col self-center">
      <h4 class="text-lg font-bold max-h-[56px] overflow-hidden">
        {{ answer.surveyTitle }}
      </h4>
      <small class="overflo-hidden flex-1"
        >Answer Made at: <i class="font-semibold">{{ answer.created_at }}</i></small
      >
    </div>

    <div class="flex items-center">
      <router-link
        :to="{
          name: 'Answer',
          params: { sid: answer.surveyId, aid: answer.answerId },
        }"
        class="flex py-2 px-3 border border-transparent text-sm rounded-md text-white transition-colors bg-indigo-600 hover:bg-indigo-700 focus:ting-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script setup>
const { answer } = defineProps({
  answer: Object,
});
</script>

<style></style>
