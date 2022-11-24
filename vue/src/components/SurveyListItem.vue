<template>
  <div class="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-grey-50 h-[470px]">
    <img :src="survey.image" alt="" class="flex self-center h-48 object-cover" />
    <h4 class="mt-4 text-lg font-bold">{{ survey.title }}</h4>
    <div v-html="survey.description" class="overflo-hidden flex-1"></div>

    <div class="flex justify-between items-center mt-3">
      <router-link
        :to="{ name: 'Survey', params: { id: survey.id } }"
        class="flex gap-2 py-2 px-3 border border-transparent text-sm rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ting-2 focus:ring-offset-2 focus:ring-indigo-500"
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

        Edit
      </router-link>
      <div class="flex items-center gap-3 sm:gap-1">
        <router-link
          :to="{ name: 'Answers', params: { query: survey.title } }"
          class="text-sm text-indigo-500 hover:text-indigo-700 rounded-full transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8"
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
        <a
          :disabled="!isSurveyActive()"
          :href="
            isSurveyActive()
              ? `/view/survey/${store.state.user.data.id}/${survey.slug}`
              : ``
          "
          target="_blank"
          class="h-8 w-8 items-center justify-center rounded-full border border-transparent text-sm transition-colors hover:text-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          :class="[
            isSurveyActive()
              ? 'text-indigo-500'
              : 'text-indigo-200 pointer-events-none cursor-not-allowed',
          ]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-7 h-7"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
            />
          </svg>
        </a>
        <button
          v-if="survey.id"
          type="button"
          @click="emit('delete', survey)"
          class="h-8 w-8 flex items-center justify-center rounded-full border border-transparent text-sm transition-colors text-red-500 hover:text-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-7 h-7"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();
const emit = defineEmits(["delete"]);

const { survey } = defineProps({
  survey: Object,
});

function isSurveyActive() {
  if (survey.expire_at != null && survey.expire_at != "") {
    const today = new Date();
    const expire = new Date(`${survey.expire_at} 00:00:00`);
    if (expire - today > 0 && survey.status) {
      return true;
    }
    return false;
  }
  if (survey.status) {
    return true;
  }
  return false;
}
</script>

<style></style>
