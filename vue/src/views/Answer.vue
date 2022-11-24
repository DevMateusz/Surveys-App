<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ answer.title }}
        </h1>
        <button
          @click="deleteAnswer"
          type="button"
          class="flex gap-1 py-2 px-3 text-white bg-red-500 hover:bg-red-600 rounded"
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
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
          Delete Answer
        </button>
      </div>
    </template>
    <div class="py-5 px-8">
      <div v-if="!loading" class="container mx-auto relative">
        <div class="absolute right-0 -top-5">{{ answer.created_at }}</div>
        <div>
          <hr class="my-3" />
          <div v-for="(question, index) of answer.questions" :key="question._id">
            <AnswerViewer
              :question="question"
              :index="index"
              class="opacity-0 animate-fade-in-down"
              :style="{ animationDelay: `${index * 0.05}s` }"
            />
          </div>
        </div>
      </div>
      <div v-else class="flex justify-center">Loading...</div>
    </div>
  </PageComponent>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import PageComponent from "../components/PageComponent.vue";
import AnswerViewer from "../components/viewer/AnswerViewer.vue";
import store from "../store";
import Swal from "sweetalert2";

const router = useRouter();
const route = useRoute();

const loading = computed(() => store.state.currentAnswer.loading);
const answer = computed(() => store.state.currentAnswer.data);

store.dispatch("getAnswer", { sid: route.params.sid, aid: route.params.aid });

function deleteAnswer() {
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
      store
        .dispatch("deleteAnswer", { sid: route.params.sid, aid: route.params.aid })
        .then(() => {
          router.go(-1);
          store.commit("notify", {
            type: "success",
            message: "Answer has been successfully removed",
          });
        });
    }
  });
}
</script>

<style scoped></style>
