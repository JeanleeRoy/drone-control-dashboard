import { useMutation } from "@tanstack/vue-query";
import { sendNewDroneCommand } from "../services";
import { useMessage } from "naive-ui";

export const useSendCommand = () => {
  const alert = useMessage();
  const sendCommandFn = async (simpleCommand: string) => {
    return sendNewDroneCommand({
      command: simpleCommand,
      test: true,
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
