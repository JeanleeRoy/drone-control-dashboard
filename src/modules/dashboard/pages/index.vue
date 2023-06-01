<script lang="ts" setup>
import Container from "~/components/Container.vue";
import Control from "../components/control.vue";
import DashboardBlock from "../components/dashboard-block.vue";
import DroneImage from "../image/drone-image.vue";
import IntensitySlider from "../components/intensitySlider.vue";
import Map from "../components/map.vue";
import { DroneCommand } from "../types/Index";
import { ref } from "vue";

const comands = ref<DroneCommand[]>([]);
const intensity = ref(4);

const isActive = ref(false);

const addCommand = (cmd: string) => {
  if (cmd === "Off") {
    comands.value = [];
    isActive.value = false;
  } else {
    const command: DroneCommand = {
      command: cmd,
    };
    if (cmd === "On") {
      isActive.value = true;
    } else {
      command.intensity = intensity.value;
    }
    comands.value = [command, ...comands.value];
  }
};
</script>

<template>
  <Container>
    <div class="w-full">
      <div>
        <p class="text-gray-400 py-3 text-base">
          Bienvenido al panel de control
        </p>
      </div>

      <div class="grid md:grid-cols-[3fr_1fr] gap-5">
        <DashboardBlock>
          <div class="flex flex-col md:flex-row">
            <Control @command="addCommand" />
            <IntensitySlider v-model="intensity" :disabled="!isActive" />
          </div>
        </DashboardBlock>
        <DashboardBlock>
          <p class="text-gray-400 pb-3">Comandos enviados al Drone</p>
          <div
            v-if="isActive"
            class="flex flex-col-reverse h-full max-h-[380px] overflow-y-auto text-gray-400 gap-y-1s"
          >
            <p v-for="cmd in comands" class="border-b border-gray-800 py-2">
              {{ cmd.command }}
              <span v-if="cmd.intensity">- {{ cmd.intensity }}</span>
            </p>
          </div>
          <div v-else class="grid place-items-center text-gray-500 h-[380px]">
            <DroneImage class="w-full h-fit px-7" />
            <p>Sin comandos</p>
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
