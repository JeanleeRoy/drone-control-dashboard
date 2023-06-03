<script lang="ts" setup>
import { getTime } from "~/shared/utils/date";
import { PanelCommand } from "../types/Index";
import DroneImage from "../image/drone-image.vue";
import { useMediaQuery } from "@vueuse/core";

defineProps<{
  isActive: boolean;
  comands: PanelCommand[];
  listHeight: number;
}>();

const isMdScreen = useMediaQuery("(min-width: 768px)");
</script>

<template>
  <div class="w-full h-full">
    <p class="text-gray-400 pb-3">Comandos enviados al Drone</p>
    <div
      v-if="isActive"
      class="flex flex-col-reverse h-[260px] md:h-full overflow-y-auto text-gray-400 gap-y-1"
      :style="{
        maxHeight: !isMdScreen ? 'none' : Math.trunc(listHeight - 30) + 'px',
      }"
    >
      <div
        v-for="cmd in comands"
        class="inline-flex justify-between border-b border-gray-800 py-2 md:mr-3"
      >
        <p>
          {{ cmd.command }}
          <span v-if="cmd.intensity"> • {{ cmd.intensity }}</span>
        </p>
        <div class="relative">
          <span v-if="cmd.receivedAt">
            {{ getTime(cmd.receivedAt) }}
          </span>
          <n-spin
            v-else
            class="absolute -translate-x-[18px] translate-y-[1px]"
            :size="12"
          />
        </div>
      </div>
      <p class="border-b border-gray-800 py-2">On</p>
    </div>
    <div v-else class="grid place-items-center text-gray-500 md:h-[380px]">
      <DroneImage class="h-[240px] w-full md:h-fit px-7" />
      <p>Sin comandos</p>
    </div>
  </div>
</template>
