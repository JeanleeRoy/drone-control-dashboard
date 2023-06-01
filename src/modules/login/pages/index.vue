<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();

const onSubmit = () => {
  router.push({ name: "dashboard.index" });
};
</script>

<template>
  <main class="flex justify-center items-center w-full min-h-screen p-4">
    <div class="px-4 my-14 w-[300px] max-w-full">
      <n-card title="Bienvenido" bordered>
        <n-form class="w-full" @submit.prevent="onSubmit">
          <n-form-item label="Correo">
            <n-input placeholder="user@email.com" />
          </n-form-item>
          <n-form-item label="Contraseña">
            <n-input
              placeholder="********"
              type="password"
              @keydown.enter.prevent
            />
          </n-form-item>

          <n-button attr-type="submit" round block size="medium" type="success">
            Iniciar sesión
          </n-button>
        </n-form>
      </n-card>
    </div>
  </main>
</template>
