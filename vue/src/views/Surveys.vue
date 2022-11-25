<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Surveys</h1>
        <router-link
          :to="{ name: 'SurveyCreate' }"
          class="flex py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600"
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>

          Add new Survey
        </router-link>
      </div>
    </template>
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
      <SurveyListItem
        v-for="(survey, index) in surveys"
        :key="survey.id"
        :survey="survey"
        class="opacity-0 animate-fade-in-down"
        :style="{ animationDelay: `${index * 0.1}s` }"
        @delete="deleteSurvey"
      />
    </div>
    <div v-if="loading" class="flex justify-center">Loading...</div>
    <div v-if="!surveys.length" class="flex justify-center">Create your first survey</div>
  </PageComponent>
</template>

<script setup>
import store from "../store";
import { computed } from "vue";
import SurveyListItem from "../components/SurveyListItem.vue";
import PageComponent from "../components/PageComponent.vue";
import Swal from "sweetalert2";

const surveys = computed(() => store.state.surveys.data);
const loading = computed(() => store.state.surveys.loading);

store.dispatch("getSurveys");
function deleteSurvey(survey) {
  Swal.fire({
    title: "Are you sure?",
    text: "The operation cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#4f46e5",
    cancelButtonColor: "#ef4444",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      store.dispatch("deleteSurvey", survey.id).then(() => {
        store.dispatch("getSurveys");
        store.commit("notify", {
          type: "success",
          message: "Survey has been successfully removed",
        });
      });
    }
  });
}
</script>
