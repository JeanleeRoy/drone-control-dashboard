import { ref } from "vue";
import { Controls } from "../types/Index";

export const useControls = () => {
  const controls1 = ref<Controls>({
    left: {
      label: "Left",
      command: "Left",
    },
    right: {
      label: "Right",
      command: "Right",
    },
    top: {
      label: "Front",
      command: "Front",
    },
    down: {
      label: "Back",
      command: "Back",
    },
  });

  const controls2 = ref<Controls>({
    top: {
      label: "Up",
      command: "Up",
    },
    down: {
      label: "Down",
      command: "Down",
    },
  });

  return {
    controls1,
    controls2,
  };
};
