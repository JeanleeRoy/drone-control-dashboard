export interface DroneCommand {
  id: string;
  command: string;
  intensity?: number;
  receivedAt?: string;
}
