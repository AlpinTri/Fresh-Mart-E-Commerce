<template>
  <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4">
    <div class="w-full py-4 flex flex-col space-y-4">
      <div id="breadcrumbs" class="flex space-x-2 text-sm text-slate-400 font-semibold">
        <NuxtLink to="/" class="hover:text-lime-400">Beranda</NuxtLink>
        <span>/</span>
        <NuxtLink to="/products" class="hover:text-lime-400">Products</NuxtLink>
        <span>/</span>
        <div class="text-lime-400">{{ $route.params._id }}</div>
      </div>

      <div class="grid grid-cols-[1fr_2fr] space-x-8 pt-4 border-t" id="product-detail">
        <div class="flex flex-col relative">
          <div class="flex flex-col space-y-4 sticky top-6">
            <div class="rounded-md bg-slate-50 border p-4">
              <img :src="`/img/${product.name?.toLocaleLowerCase()}.png`" alt="" draggable="true">
            </div>
            <!-- <div class="rounded-md bg-slate-50 border">
              <img src="/img/avocado-apiece.webp" alt="" class="w-full aspect-square object-cover object-center">
            </div> -->
            <div class="grid grid-cols-5">
              <div class="hover:ring-lime-500 hover:ring-2 cursor-pointer border rounded-md bg-slate-50 w-fit">
                <img src="/img/avocado-apiece.webp" class="object-center object-cover" alt="">
              </div>
            </div>
          </div>
        </div>

        <div class="">
          <div class="w-full flex flex-col space-y-4">
            <h1 class=" text-2xl font-semibold">{{ product.name }}</h1>

            <div class="flex flex-col">
              <!-- <span class=" text-sm ">Avocado 1 kg</span> -->
              <span class=" text-2xl font-semibold">{{ rupiah.format(product.price as number) }}</span>
            </div>

            <!-- <div class="mt-2 space-y-1">
              <h2 class=" text-lg font-semibold">Pilih varian</h2>
              <RadioGroup v-model="selected" class="">
                <div class="gap-3 flex flex-wrap">
                  <RadioGroupOption
                    as="template"
                    v-for="plan in plans"
                    :key="plan.name"
                    :value="plan"
                    v-slot="{ active, checked }"
                  >
                    <div
                      :class="[
                        checked ? 'bg-lime-50 border-lime-500 text-white ' : '',
                      ]"
                      class="relative border flex cursor-pointer rounded-lg px-4 py-3 shadow focus:outline-none"
                    >
                      <div class="flex w-full items-center justify-between">
                        <div class="flex items-center">
                          <div class="text-sm">
                            <RadioGroupLabel
                              as="p"
                              :class="checked ? 'text-lime-500' : ''"
                              class="font-medium"
                            >
                              1 Kg
                            </RadioGroupLabel>
                          </div>
                        </div>
                      </div>
                    </div>
                  </RadioGroupOption>
                </div>
              </RadioGroup>
            </div> -->

            <button class="px-4 py-2 rounded-md shadow text-sm border bg-lime-400 text-white font-semibold" @click="addToChart">
              <span>Tambahkan ke Box</span>
            </button>

            <div class="flex flex-col space-y-2">
              <div class="flex border-y">
                <label class="px-6 py-2 text-lime-400 border-b-2 border-lime-400 font-semibold cursor-pointer">Detail</label>
                <label class="px-6 py-2  font-semibold cursor-pointer">Kandungan Gizi</label>
                <label class="px-6 py-2  font-semibold cursor-pointer">Pengiriman</label>
              </div>
              <div class="">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla sint quisquam dolor deleniti aut amet reprehenderit a minus error, autem assumenda, illum asperiores consequatur quis sunt ut reiciendis quod hic!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const cart = useCartStore()
import { ref } from 'vue'
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
} from '@headlessui/vue'

const plans = [
  {
    name: 'Startup',
    ram: '12GB',
    cpus: '6 CPUs',
    disk: '160 GB SSD disk',
  },
  {
    name: 'Business',
    ram: '16GB',
    cpus: '8 CPUs',
    disk: '512 GB SSD disk',
  },
  {
    name: 'Enterprise',
    ram: '32GB',
    cpus: '12 CPUs',
    disk: '1024 GB SSD disk',
  },
]

const route = useRoute()

const selected = ref(plans[0])

const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR'
})

interface Product {
  id?: string
  name?: string
  category_id?: string
  price?: number
}

const product = ref<Product>({})

async function getProductById() {
  try {
    const { data } = await useFetch(`/api/products/${route.params._id}/`, {
      method: 'GET'
    })
    
    const response = data.value

    console.log(response)
    if (response?.success === true) {
      product.value = response.data as Product

      // Object.keys(data).forEach((key: string) => )
    }

  } catch (err) {
    console.log('err ress', err)
  }

}

await getProductById()

// Add to box 
const addToChart = async () => {
  const response = await $fetch('/api/cart', {
    method: 'POST',
    body: {
      product_id: product.value.id
    }
  })

  if (response?.success === true) {
    cart.setItems(response.data)
  }
}
</script>

<style scoped>

</style>