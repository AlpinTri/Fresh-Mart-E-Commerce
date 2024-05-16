<template>
  <Disclosure as="nav" class="bg-white shadow" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">

        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton 
            class="relative inline-flex items-center justify-center rounded-md p-2 text-black"
            @click="slideOver = !slideOver"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="block h-6 w-6" aria-hidden="true" />
            <!-- <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" /> -->
          </DisclosureButton>
        </div>

        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between sm:border-r-2 sm:pr-6">
          <div class="flex flex-shrink-0 items-center">
            <img class=" h-10 w-auto" src="~/assets/img/logo.png" alt="Your Company"/>
          </div>
          <div class="hidden sm:ml-6 sm:flex my-auto">
            <div class="flex space-x-4 items-center">
              <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-black font-base text-sm px-4">{{ item.name }}</a>
            </div>
          </div>
        </div>

        <div class="absolute space-x-8 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <!-- <button type="button" class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span class="absolute -inset-1.5" />
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button> -->

          <NuxtLink to="/cart" class="relative cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24"><path fill="#000" d="M5 8v11h14V8h-3v6.375q0 .575-.475.863t-.975.037L12 14l-2.55 1.275q-.5.25-.975-.038T8 14.376V8zm0 13q-.825 0-1.412-.587T3 19V6.525q0-.35.113-.675t.337-.6L4.7 3.725q.275-.35.687-.538T6.25 3h11.5q.45 0 .863.188t.687.537l1.25 1.525q.225.275.338.6t.112.675V19q0 .825-.587 1.413T19 21zm.4-15h13.2l-.85-1H6.25zM10 8v4.75l2-1l2 1V8zM5 8h14z"></path></svg>
            <span class="absolute rounded-full bg-lime-500 text-xs w-4 h-4 text-center -top-1 -right-1 text-white" v-if="cart.totalItems > 0">{{ cart.totalItems }}</span>
          </NuxtLink>


          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3" v-if="!isLogin">
            <div>
              <MenuButton class="relative flex text-sm text-black space-x-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                </svg>
                <span>
                  Masuk / Daftar
                </span>
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="flex w-full p-2 flex-col items-center space-y-2">
                  <div>
                    <img class="h-20 w-auto" src="~/assets/img/logo.png" alt="Your Company" />
                  </div>
                  <h2 class="text-base">Selamat datang di <span class="text-lime-500 font-semibold">Fresh-Mart</span></h2>
                  <div class="flex w-full justify-center items-center px-6 text-sm mb-4 text-white">
                    <NuxtLink to="/auth/login" class="py-2 w-full bg-lime-500 rounded-l-full flex justify-center items-center">
                      <span>Masuk</span>
                    </NuxtLink>
                    <NuxtLink to="/auth/register" class="py-2 w-full bg-lime-400 rounded-r-full flex justify-center items-center">
                      <span>Daftar</span>
                    </NuxtLink>
                  </div>
                </div>
              </MenuItems>
            </transition>
          </Menu>
          <Menu as="div" class="relative ml-3" v-else>
            <div>
              <MenuButton class="relative flex text-sm text-black space-x-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="M12 11q.825 0 1.413-.588Q14 9.825 14 9t-.587-1.413Q12.825 7 12 7q-.825 0-1.412.587Q10 8.175 10 9q0 .825.588 1.412Q11.175 11 12 11Zm0 2q-1.65 0-2.825-1.175Q8 10.65 8 9q0-1.65 1.175-2.825Q10.35 5 12 5q1.65 0 2.825 1.175Q16 7.35 16 9q0 1.65-1.175 2.825Q13.65 13 12 13Zm0 11q-2.475 0-4.662-.938q-2.188-.937-3.825-2.574Q1.875 18.85.938 16.663Q0 14.475 0 12t.938-4.663q.937-2.187 2.575-3.825Q5.15 1.875 7.338.938Q9.525 0 12 0t4.663.938q2.187.937 3.825 2.574q1.637 1.638 2.574 3.825Q24 9.525 24 12t-.938 4.663q-.937 2.187-2.574 3.825q-1.638 1.637-3.825 2.574Q14.475 24 12 24Zm0-2q1.8 0 3.375-.575T18.25 19.8q-.825-.925-2.425-1.612q-1.6-.688-3.825-.688t-3.825.688q-1.6.687-2.425 1.612q1.3 1.05 2.875 1.625T12 22Zm-7.7-3.6q1.2-1.3 3.225-2.1q2.025-.8 4.475-.8q2.45 0 4.463.8q2.012.8 3.212 2.1q1.1-1.325 1.713-2.95Q22 13.825 22 12q0-2.075-.788-3.887q-.787-1.813-2.15-3.175q-1.362-1.363-3.175-2.151Q14.075 2 12 2q-2.05 0-3.875.787q-1.825.788-3.187 2.151Q3.575 6.3 2.788 8.113Q2 9.925 2 12q0 1.825.6 3.463q.6 1.637 1.7 2.937Z"/></svg>
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="flex w-full p-1 flex-col text-sm">
                  <NuxtLink class="p-2 hover:bg-slate-50 rounded-md">Profil saya</NuxtLink>
                  <NuxtLink class="p-2 hover:bg-slate-50 rounded-md">Riwayat Transaksi</NuxtLink>
                  <NuxtLink class="p-2 hover:bg-slate-50 rounded-md">Keluar</NuxtLink>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>

      </div>
    </div>

    
    <!-- <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
      </div>
    </DisclosurePanel> -->

    <TheSlide></TheSlide>
  </Disclosure>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'


const cart = useCartStore()

interface Links {
  name: string
  href: string
  current: boolean
}

const navigation: Array<Links> = [
  { name: 'Beranda', href: '/', current: true },
  { name: 'Sayur', href: '#', current: false },
  { name: 'Buah', href: '#', current: false },
]

const slideOver = ref(false)

provide('open', slideOver)

const isLogin = ref<boolean>(false)

if (useCookie('fresh_mart_authorization').value) {
  isLogin.value = true
} else {
  isLogin.value = false
}
</script>

<style scoped>

</style>