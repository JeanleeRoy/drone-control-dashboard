import { useMutation } from "@tanstack/vue-query";
import { sendNewDroneCommand } from "../services";
import { useMessage } from "naive-ui";

interface SendCommandProps {
  command: string;
  intensity: number;
}

export const useSendCommand = () => {
  const alert = useMessage();
  const sendCommandFn = async (payload: SendCommandProps) => {
    return sendNewDroneCommand({
      command: `${payload.command} ${payload.intensity}`,
      test: false,
    });
  };

  const { mutateAsync, isSuccess } = useMutation({
    mutationFn: sendCommandFn,
    onSuccess: () => {
      alert.success("Comando enviado", {
        duration: 3500,
      });
    },
    onError: () => {
      alert.error("Error al enviar el comando", {
        duration: 3500,
      });
    },
  });

  return {
    sendDroneCommand: mutateAsync,
    isSuccess,
  };
};
