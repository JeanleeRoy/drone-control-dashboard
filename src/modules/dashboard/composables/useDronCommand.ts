import { Ref } from "vue";
import { DroneCommand } from "../types/Index";

export const useDroneCommand = (command: Ref<DroneCommand>) => {
  const getStringCommand = () => {
    return `1${command.value.leftRight}2${command.value.upDown}3${command.value.frontBack}`;
  };

  const addChanelIntensity = (cmd: string, intensity: number) => {
    const isUpperBound = cmd === "Up" || cmd === "Right" || cmd === "front";
    const baseIntensity = isUpperBound ? intensity + 5 : intensity;

    if (cmd === "Up" || cmd === "Down") {
      command.value.upDown = baseIntensity;
      return;
    }

    if (cmd === "Left" || cmd === "Right") {
      command.value.leftRight = baseIntensity;
      return;
    }

    if (cmd === "Front" || cmd === "Back") {
      command.value.frontBack = baseIntensity;
      return;
    }
  };

  const resetCommand = () => {
    command.value = {
      leftRight: 5,
      frontBack: 5,
      upDown: 1,
    };
  };

  return {
    getStringCommand,
    addChanelIntensity,
    resetCommand,
  };
};
