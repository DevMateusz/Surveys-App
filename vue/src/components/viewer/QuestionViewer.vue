<template>
  <fieldset class="mb-4">
    <DefaultViewer :index="index" :question="question" />
    <div class="mt-3">
      <div v-if="question.type === 'select'">
        <select
          required
          :value="modelValue ? modelValue.answer : modelValue"
          @change="
            emits('update:modelValue', {
              answer: $event.target.value,
              questionId: question.id,
            })
          "
          class="mt-1 blcko w-full py-2 px-3 border border-fray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 docus:border-indigo-500 sm:text-sm"
        >
          <option value="">Please Select</option>
          <option v-for="option in question.data.options" :value="option.text">
            {{ option.text }}
          </option>
        </select>
      </div>
      <div v-else-if="question.type === 'radio'">
        <div v-for="(option, index) of question.data.options" class="flex items-center">
          <input
            required
            type="radio"
            :key="'question' + question.id + '-' + index"
            :name="'question' + question.id"
            :value="option.text"
            @change="
              emits('update:modelValue', {
                answer: $event.target.value,
                questionId: question.id,
              })
            "
            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border border-gray-300"
          />
          <label
            :for="'question' + question.id + '-' + index"
            class="ml-3 block text-sm font-medium text-gray-700"
            >{{ option.text }}</label
          >
        </div>
      </div>
      <div v-else-if="question.type === 'checkbox'">
        <div v-for="(option, index) of question.data.options" class="flex items-center">
          <input
            :id="'question' + question.id + '-' + index"
            type="checkbox"
            v-model="model[option.text]"
            @change="onCheckboxChange"
            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border border-gray rounded"
          />
          <label
            :for="'question' + question.id + '-' + index"
            class="ml-3 block text-sm font-medium text-gray-700"
          >
            {{ option.text }}
          </label>
        </div>
      </div>
      <div v-else-if="question.type === 'text'">
        <input
          required
          type="text"
          :value="modelValue ? modelValue.answer : modelValue"
          @input="
            emits('update:modelValue', {
              answer: $event.target.value,
              questionId: question.id,
            })
          "
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md px-3 py-2"
        />
      </div>
      <div v-else-if="question.type === 'textarea'">
        <textarea
          required
          :value="modelValue ? modelValue.answer : modelValue"
          @input="
            emits('update:modelValue', {
              answer: $event.target.value,
              questionId: question.id,
            })
          "
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md px-3 py-2"
        ></textarea>
      </div>
    </div>
    <hr class="my-4" />
  </fieldset>
</template>

<script setup>
import { ref } from "vue";
import DefaultViewer from "./DefaultViewer.vue";
const { question, index, modelValue } = defineProps({
  question: Object,
  index: Number,
  modelValue: [Object],
});

const emits = defineEmits(["update:modelValue"]);
emits("update:modelValue", { answer: "", questionId: question.id });

let model;
if (question.type === "checkbox") {
  model = ref({});
}

function onCheckboxChange($event) {
  const selectedOptions = [];
  for (let text in model.value) {
    if (model.value[text]) {
      selectedOptions.push(text);
    }
  }
  emits("update:modelValue", { answer: selectedOptions, questionId: question.id });
}
</script>

<style scoped></style>
