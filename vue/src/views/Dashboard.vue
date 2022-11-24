<template>
  <PageComponent title="Dashboard">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700">
      <div
        class="bg-white shadow-md animate-fade-in-down p-3 text-center flex flex-col order-1 lg:order-2"
        style="animation-delay: 0.1s"
      >
        <h3 class="text-2xl font-semibold">Total Surveys</h3>
        <div class="text-8xl font-semibold flex-1 flex items-center justify-center">
          {{ data.totalSurveys }}
        </div>
      </div>
      <div
        class="bg-white shadow-md animate-fade-in-down p-3 text-center flex flex-col order-2 lg:order-4"
        style="animation-delay: 0.2s"
      >
        <h3 class="text-2xl font-semibold">Total Answers</h3>
        <div class="text-8xl font-semibold flex-1 flex items-center justify-center">
          {{ data.totalAnswers }}
        </div>
      </div>
      <div
        class="bg-white shadow-md animate-fade-in-down p-4 row-span-2 order-3 lg:order-1"
      >
        <h3 class="text-2xl font-semibold mb-3">Latest Survey</h3>
        <div v-if="data.latestSurvey == null">You don't have any surveys</div>
        <div v-else>
          <img
            :src="data.latestSurvey.image"
            :alt="data.latestSurvey.title"
            class="w-[240px] mx-auto"
          />
          <h3 class="font-bold text-xl mb-3 mt-3">{{ data.latestSurvey.title }}</h3>
          <div class="flex justify-between text-sm mb-2">
            <div>Created Data:</div>
            <div>{{ data.latestSurvey.created_at }}</div>
          </div>
          <div class="flex justify-between text-sm mb-2">
            <div>Expire Data:</div>
            <div v-if="data.latestSurvey.expire_at">
              {{ data.latestSurvey.expire_at }} 00:00:00
            </div>
          </div>
          <div class="flex justify-between text-sm mb-2">
            <div>Status:</div>
            <div>{{ data.latestSurvey.status ? "Active" : "Draft" }}</div>
          </div>
          <div class="flex justify-between text-sm mb-1">
            <div>Questions:</div>
            <div>{{ data.latestSurvey.questions }}</div>
          </div>
          <div class="flex justify-between text-sm mb-1">
            <div>Answers:</div>
            <div>{{ data.latestSurvey.answers }}</div>
          </div>
          <div class="flex justify-between">
            <router-link
              v-if="data.latestSurvey"
              :to="{ name: 'Survey', params: { id: data.latestSurvey._id } }"
              class="flex gap-2 py-2 px-4 border border-transparent text-sm rounded-md text-indigo-500 hover:bg-indigo-700 hover:text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>

              Edit Survey
            </router-link>
            <router-link
              :to="{ name: 'Answers', params: { query: data.latestSurvey.title } }"
              class="flex gap-2 py-2 px-4 border border-transparent text-sm rounded-md text-indigo-500 hover:bg-indigo-700 hover:text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
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

              View Answers
            </router-link>
          </div>
        </div>
      </div>
      <div
        class="bg-white shadow-md animate-fade-in-down p-4 row-span-2 order-4 lg:order-3"
        style="animation-delay: 0.3s"
      >
        <div class="flex justify-between items-center">
          <h3 class="text-2xl font-semibold">Latest Answers</h3>

          <router-link
            :to="{ name: 'Answers' }"
            class="text-sm text-blue-500 hover:decoration-blue-500"
          >
            View all
          </router-link>
        </div>
        <router-link
          v-if="data.latestAnswers.length"
          v-for="answer of data.latestAnswers"
          :to="{
            name: 'Answer',
            params: { sid: answer.surveyId, aid: answer.answerId },
          }"
          :key="answer._id"
          class="block p-2 hover:bg-gray-100/90"
        >
          <div class="font-semibold">{{ answer.surveyTitle }}</div>
          <small>
            Answer Made at:
            <i class="font-semibold">{{ answer.created_at }}</i>
          </small>
        </router-link>
        <div class="block mt-3" v-else>You don't have any answers yet</div>
      </div>
    </div>
    <div v-if="loading" class="flex justify-center">Loading...</div>
  </PageComponent>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const loading = computed(() => store.state.dashboard.loading);
const data = computed(() => store.state.dashboard.data);
store.dispatch("getDashboardData");
</script>

<style scoped></style>
