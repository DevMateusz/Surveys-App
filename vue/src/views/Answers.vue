<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex justify-between min-h-[40px] flex-col sm:items-center sm:flex-row">
        <h1 class="text-3xl font-bold text-gray-900">Answers</h1>
        <input
          type="text"
          name="search"
          autocomplete="off"
          v-model="search"
          placeholder="Search surveys..."
          class="mt-3 p-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:mt-0 sm:w-[300px] shadow-sm sm:text-sm border border-gray-300 rounded-md"
        />
      </div>
    </template>
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
      <AnswerListItem
        v-for="(answer, index) in filteredAnswers()"
        :key="answer.answerId"
        :answer="answer"
        class="opacity-0 animate-fade-in-down"
        :style="{ animationDelay: `${index * 0.05}s` }"
      />
    </div>
    <div v-if="loading" class="flex justify-center">Loading...</div>
    <div v-if="!search && !filteredAnswers().length" class="flex justify-center">
      You don't have any answers
    </div>
    <div v-if="search && !filteredAnswers().length" class="flex justify-center">
      No results found
    </div>
  </PageComponent>
</template>

<script setup>
import store from "../store";
import { computed, ref } from "vue";
import AnswerListItem from "../components/AnswerListItem.vue";
import PageComponent from "../components/PageComponent.vue";
import { useRoute } from "vue-router";

const route = useRoute();

let search = ref("");
if (route.params.query) {
  search.value = route.params.query;
}

const answers = computed(() => store.state.answers.data);
const loading = computed(() => store.state.answers.loading);

function filteredAnswers() {
  return answers.value.filter((answer) => {
    return answer.surveyTitle.toLowerCase().includes(search.value.toLocaleLowerCase());
  });
}

store.dispatch("getAnswers");
</script>

<style scoped></style>
