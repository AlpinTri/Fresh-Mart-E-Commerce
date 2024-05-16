<template>
  <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4 h-screen">
    <div class="flex flex-col items-center justify-center min-h-full space-y-4">
      <h2 class=" text-2xl font-semibold">Masuk ke <span class="text-lime-500 font-semibold">Fresh-Mart</span></h2>
      <div class="rounded-md bg-white border p-8 flex flex-col shadow-md items-center space-y-4">
        <div>
          <img src="~/assets/img/logo.png" class="h-32" alt="">
        </div>
        <div action="" class="space-y-4">
          <div class="flex flex-col items-start">
            <span class="text-sm font-semibold">Email atau Nomor HP</span>
            <input type="text" class="p-2 text-sm w-80 rounded-md border outline-lime-400" v-model="credentials.nomor_hp">
          </div>
          <div class="flex flex-col items-start">
            <span class="text-sm font-semibold">Password</span>
            <input type="password" class="p-2 text-sm w-80 rounded-md border outline-lime-400" v-model="credentials.password">
          </div>
          <button @click="login" class="p-2 w-full bg-lime-400 rounded-md text-white text-sm disabled:bg-slate-200" :disabled="isDataComplete()">
            Masuk
          </button>
        </div>
        <div class="text-sm">Belum punya akun? <NuxtLink to="/auth/register" class="text-lime-400 font-semibold">Daftar sekarang</NuxtLink></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const isDataComplete = (): boolean => !credentials.password.trim() || !credentials.nomor_hp.trim() ? true : false

const credentials = reactive({
  nomor_hp: '',
  password: ''
})

const login = async () => {
  try {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        nomor_hp: credentials.nomor_hp,
        password: credentials.password
      }
    })

    if (response) {
      if (response.success === true) {
        // setUser({ username: response.data.username, nomor_hp: response.data.nomor_hp, isLogin: true })
        return navigateTo('/')
      }
    }
  } catch (err) {
    console.log(err)
  }
}
</script>

<style scoped>

</style>