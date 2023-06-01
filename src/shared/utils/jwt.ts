export const decodeJwtToken = <T>(token: string) => {
  const [, payload] = token.split(".");
  const decodedPayload = window.atob(payload);

  return JSON.parse(decodedPayload) as T;
};
