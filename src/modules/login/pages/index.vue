<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useField, useForm } from "vee-validate";
import { useRouter } from "vue-router";
import { z } from "zod";

const router = useRouter();

const { handleSubmit } = useForm({
  validateOnMount: false,
  initialValues: {
    email: "",
    password: "",
  },
  validationSchema: toTypedSchema(
    z.object({
      email: z.string().nonempty("El correo es requerido").email({
        message: "Ingrese un correo válido",
      }),
      password: z
        .string()
        .nonempty("La contraseña es requerida")
        .min(6, "Ingrese por lo menos 6 caracteres"),
    })
  ),
});

const {
  value: email,
  handleBlur: emailBlur,
  meta: emailMeta,
  errorMessage: emailError,
} = useField<string>("email");

const {
  value: password,
  handleBlur: passwordBlur,
  meta: passwordMeta,
  errorMessage: passwordError,
} = useField<string>("password");

const onSubmit = handleSubmit(async () => {
  router.push({ name: "dashboard.index" });
});
</script>

<template>
  <main class="flex justify-center items-center w-full min-h-screen p-4">
    <div class="px-4 md:my-14">
      <n-card title="Bienvenido">
        <n-form class="w-full" @submit.prevent="onSubmit">
          <div class="flex flex-col gap-2.5 w-full max-w-[300px] md:w-[300px]">
            <n-form-item
              label="Correo"
              :feedback="emailError"
              :validation-status="
                emailMeta.touched && !emailMeta.valid ? 'error' : undefined
              "
            >
              <n-input
                v-model:value="email"
                placeholder="user@email.com"
                @blur="emailBlur"
                @keydown.enter.prevent
              />
            </n-form-item>

            <n-form-item
              label="Contraseña"
              :feedback="passwordError"
              :validation-status="
                passwordMeta.touched && !passwordMeta.valid
                  ? 'error'
                  : undefined
              "
            >
              <n-input
                v-model:value="password"
                placeholder="********"
                type="password"
                @blur="passwordBlur"
                @keydown.enter.prevent
              />
            </n-form-item>

            <n-button
              attr-type="submit"
              round
              block
              size="medium"
              type="success"
            >
              Iniciar sesión
            </n-button>
          </div>
        </n-form>
      </n-card>
    </div>
  </main>
</template>
