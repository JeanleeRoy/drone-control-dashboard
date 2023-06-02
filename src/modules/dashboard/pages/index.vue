<script lang="ts" setup>
import Container from "~/components/Container.vue";
import Control from "../components/control.vue";
import DashboardBlock from "../components/dashboard-block.vue";
import DroneImage from "../image/drone-image.vue";
import IntensitySlider from "../components/intensitySlider.vue";
import Map from "../components/map.vue";
import { DroneCommand, PanelCommand } from "../types/Index";
import { useSendCommand } from "../composables/useSendCommand";
import { useDroneCommand } from "../composables/useDronCommand";
import { getTime } from '~/shared/utils/date';
import { ref } from "vue";

const comands = ref<PanelCommand[]>([]);
const intensity1 = ref(2);
const intensity2 = ref(2);

const isActive = ref(false);

const droneCommand = ref<DroneCommand>({
  leftRight: 5,
  frontBack: 5,
  upDown: 1,
});

const { addChanelIntensity, getStringCommand, resetCommand } =
  useDroneCommand(droneCommand);

const { sendDroneCommand } = useSendCommand();

const handleSendCommand = (cmd: PanelCommand) => {
  if (!isActive.value) return;

  addChanelIntensity(cmd.command, cmd.intensity);
  const simpleCmd = getStringCommand();

  sendDroneCommand(simpleCmd)
    .then(() => {
      comands.value = comands.value.map((c) => {
        if (c.id === cmd.id) {
          c.receivedAt = new Date().toISOString();
        }
        return c;
      });
    })
    .catch(() => {});
};

const resetState = () => {
  resetCommand();
  comands.value = [];
  intensity1.value = 2;
  intensity2.value = 2;
  isActive.value = false;
};

const addCommand = (cmd: string) => {
  if (cmd === "Off") {
    resetState();
  } else {
    if (cmd === "On") {
      isActive.value = true;
      return;
    }

    const isElevation = cmd === "Up" || cmd === "Down";
    const intensity = isElevation ? intensity2.value : intensity1.value;
    const command: PanelCommand = {
      id: Date.now().toString(),
      command: cmd,
      intensity: intensity || 1,
    };

    comands.value = [command, ...comands.value];
    handleSendCommand(command);
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
            <IntensitySlider v-model="intensity1" :disabled="!isActive" />
          </div>
        </DashboardBlock>
        <DashboardBlock>
          <p class="text-gray-400 pb-3">Comandos enviados al Drone</p>
          <div
            v-if="isActive"
            class="flex flex-col-reverse h-[260px] md:h-full md:max-h-[380px] overflow-y-auto text-gray-400 gap-y-1s"
          >
            <div
              v-for="cmd in comands"
              class="inline-flex justify-between border-b border-gray-800 py-2 ml-1"
            >
              <p>
                {{ cmd.command }}
                <span v-if="cmd.intensity"> • {{ cmd.intensity }}</span>
              </p>
              <div class="relative">
                <span v-if="cmd.receivedAt">
                  {{ getTime(cmd.receivedAt) }}
                </span>
                <n-spin v-else class="absolute -translate-x-[18px] translate-y-[1px]" :size="12" />
              </div>
            </div>
            <p class="border-b border-gray-800 py-2">On</p>
          </div>
          <div
            v-else
            class="grid place-items-center text-gray-500 md:h-[380px]"
          >
            <DroneImage class="h-[240px] w-full md:h-fit px-7" />
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
