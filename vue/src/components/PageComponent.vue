<template>
  <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
      <h1 v-if="title" class="text-3xl font-bold tracking-tight text-gray-900">
        {{ title }}
      </h1>
    </div>
  </header>
  <main>
    <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <!-- Replace with your content -->
      <div class="px-4 py-6 sm:px-0"></div>
      <!-- /End replace -->
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
