<template>
  <div class="p-2 sm:py-5 sm:px-8">
    <div v-if="loading" class="flex justify-center">Loading...</div>
    <div
      v-if="surveyUnavailable"
      class="text-xl mb-3 font-semibold text-black text-center"
    >
      Sorry this survey is no longer available.
    </div>
    <form
      v-if="!surveyUnavailable"
      @submit.prevent="submitSurvey"
      class="container mx-auto accent-indigo-500"
    >
      <div class="grid grid-cols-6 items-center">
        <div class="mr-4">
          <img :src="survey.image" :alt="survey.title" />
        </div>
        <div class="col-span-5">
          <h1 class="text-3xl mb-3">{{ survey.title }}</h1>
          <p class="text-gray-500 text-sm" v-html="survey.description"></p>
        </div>
      </div>
      <div
        v-if="surveyFinished"
        class="py-8 px-6 bg-emerald-400 text-white w-full sm:w-[600px] mx-auto mt-10"
      >
        <div class="text-xl mb-3 font-semibold">
          Thank you for participating in this survey.
        </div>
        <button
          @click="submitAnotherResponse"
          type="button"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit another response
        </button>
      </div>
      <div v-else>
        <hr class="my-3" />
        <div v-for="(question, index) of survey.questions" :key="question.id">
          <QuestionViewer v-model="answers[index]" :question="question" :index="index" />
        </div>
        <button
          type="submit"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import QuestionViewer from "../components/viewer/QuestionViewer.vue";
const route = useRoute();
const store = useStore();

const loading = computed(() => store.state.currentSurvey.loading);
const survey = computed(() => store.state.currentSurvey.data);

const surveyFinished = ref(false);
const surveyUnavailable = ref(false);

const answers = ref([]);

store
  .dispatch("getSurveyBySlug", { id: route.params.id, slug: route.params.slug })
  .catch((err) => {
    if (err.response.status == 403) {
      surveyUnavailable.value = true;
    }
  });

function submitSurvey() {
  store
    .dispatch("saveSurveyAnswer", {
      userId: route.params.id,
      surveyId: survey.value.id,
      answers: answers.value,
    })
    .then((response) => {
      if (response.status == 201) {
        surveyFinished.value = true;
      }
    });
}

function submitAnotherResponse() {
  answers.value = [];
  surveyFinished.value = false;
}
</script>

<style scoped></style>
