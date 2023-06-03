<script lang="ts" setup>
import { useVModel } from "@vueuse/core";

const props = withDefaults(
  defineProps<{
    modelValue: number | undefined;
    disabled: boolean;
    title: string;
    min: number;
    max: number;
    vertical: boolean;
  }>(),
  {
    modelValue: 2,
    disabled: true,
    title: "Intensidad",
    min: 1,
    max: 4,
    vertical: false,
  }
);

const emit = defineEmits(["update:modelValue"]);

const intensity = useVModel(props, "modelValue", emit);
</script>

<template>
  <div :class="'my-control-slider'">
    <div class="flex flex-col items-center gap-3 md:max-w-[300px]">
      <h3
        class="font-medium text-base w-full md:text-center"
        :class="disabled ? 'text-gray-500' : 'text-gray-400'"
      >
        {{ title }}
      </h3>
      <n-slider
        v-model:value="intensity"
        class="!md:width-full"
        :disabled="disabled"
        :min="min"
        :max="max"
        :step="1"
        :vertical="vertical"
      />
      <n-input-number
        v-model:value="intensity"
        :disabled="disabled"
        :min="min"
        :max="max"
        placeholder="1"
        size="small"
      />
    </div>
  </div>
</template>

<style>
.my-control-slider .n-slider.n-slider--vertical {
  width: 100% !important;
}
</style>
