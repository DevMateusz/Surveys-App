<template>
  <header class="bg-white shadow-md">
    <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
      <h1
        v-if="title"
        class="text-3xl font-bold tracking-tight text-gray-900 h-[40px] mb-0 flex items-center"
      >
        {{ title }}
      </h1>
      <slot name="header"></slot>
    </div>
  </header>
  <main>
    <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <slot></slot>
    </div>
  </main>
</template>

<script setup>
const props = defineProps({
  title: String,
});
</script>

<style></style>
