<script lang="ts" setup>
import Container from "~/components/Container.vue";
import DashboardBlock from "../components/dashboard-block.vue";
import Control from "../components/control.vue";
import DroneImage from "../image/drone-image.vue";
import Map from "../components/map.vue";
import { ref } from "vue";

const comands = ref<string[]>([]);

const isActive = ref(false);

const addCommand = (command: string) => {
  if (command === "Off") {
    comands.value = [];
    isActive.value = false;
  } else if (command === "On") {
    isActive.value = true;
  } else comands.value.push(command);
};
</script>

<template>
  <Container>
    <div class="w-full">
      <div>
        <p class="text-gray-400 py-3">Bienvenido al panel de control</p>
      </div>

      <div class="grid grid-cols-[3fr_1fr] gap-5">
        <DashboardBlock>
          <Control @command="addCommand" />
        </DashboardBlock>
        <DashboardBlock>
          <p class="text-gray-400 pb-3">Comandos enviados al Drone</p>
          <div
            v-if="comands.length > 0"
            class="flex flex-col-reverse h-full max-h-[380px] overflow-y-auto text-gray-400 gap-y-1s"
          >
            <p v-for="cmd in comands" class="border-b border-gray-800 py-2">
              {{ cmd }}
            </p>
          </div>
          <div v-else class="grid place-items-center text-gray-500 h-[380px]">
            <DroneImage class="w-full h-fit px-7" />
            <p>No hay comandos</p>
          </div>
        </DashboardBlock>
        <DashboardBlock>
          <Map />
        </DashboardBlock>
        <DashboardBlock />
      </div>
    </div>
  </Container>
</template>
