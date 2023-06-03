<script lang="ts" setup>
import CommandList from "../components/commandList.vue";
import Container from "~/components/Container.vue";
import Control from "../components/control.vue";
import DashboardBlock from "../components/dashboard-block.vue";
import IntensitySlider from "../components/intensitySlider.vue";
import Map from "../components/map.vue";
import { DroneCommand, PanelCommand } from "../types/Index";
import { Icon } from "@vicons/utils";
import { Power24Filled } from "@vicons/fluent";
import { useSendCommand } from "../composables/useSendCommand";
import { useDroneCommand } from "../composables/useDronCommand";
import { ref } from "vue";
import { useControls } from "../composables/useControls";
import { useElementSize } from "@vueuse/core";

const comands = ref<PanelCommand[]>([]);
const intensity1 = ref(2);
const intensity2 = ref(2);

const isActive = ref(false);

const droneCommand = ref<DroneCommand>({
  leftRight: 5,
  frontBack: 5,
  upDown: 1,
});

const { controls1, controls2 } = useControls();

const { addChanelIntensity, getSerialCommand, resetCommand } =
  useDroneCommand(droneCommand);

const { sendDroneCommand } = useSendCommand();

const handleSendCommand = (cmd: PanelCommand) => {
  if (!isActive.value) return;

  addChanelIntensity(cmd.command, cmd.intensity);
  const serialCmd = getSerialCommand();

  sendDroneCommand(serialCmd)
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

const containerlRef = ref<HTMLElement | undefined>();
const { height: listHeight } = useElementSize(containerlRef);
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
        <DashboardBlock class="h-fit" ref="containerlRef">
          <div
            class="w-full flex justify-end items-center pt-2 pr-2 top-0 left-0 md:pt-3 md:pr-3"
          >
            <p class="mr-3 text-[#c6c6c6]">
              {{ isActive ? "Conectado" : "Inactivo" }}
            </p>
            <button
              class="pt-1 h-10 w-10 rounded-full"
              :class="
                isActive ? '!bg-red-700 text-white' : '!bg-red-900 text-red-300'
              "
              :style="{ boxShadow: '0 0 10px 5px #000' }"
              @click="addCommand(isActive ? 'Off' : 'On')"
            >
              <Icon size="22px">
                <Power24Filled />
              </Icon>
            </button>
          </div>
          <div class="w-full grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
            <div class="flex flex-col items-center">
              <Control
                :controls="controls1"
                :active="isActive"
                @command="addCommand"
              />
              <IntensitySlider v-model="intensity1" :disabled="!isActive" />
            </div>
            <div class="flex flex-col items-center">
              <Control
                :controls="controls2"
                :active="isActive"
                @command="addCommand"
              />
              <IntensitySlider v-model="intensity2" :disabled="!isActive" />
            </div>
          </div>
        </DashboardBlock>
        <DashboardBlock>
          <CommandList
            :isActive="isActive"
            :comands="comands"
            :listHeight="listHeight"
          />
        </DashboardBlock>
        <DashboardBlock>
          <Map />
        </DashboardBlock>
        <DashboardBlock />
      </div>
    </div>
  </Container>
</template>
