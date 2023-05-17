<script lang="ts" setup>
import NavBar from "~/components/NavBar.vue";
</script>

<template>
  <div class="flex flex-col h-screen bg-black">
    <NavBar />
    <main class="overflow-y-auto h-full">
      <RouterView />
    </main>
  </div>
</template>
