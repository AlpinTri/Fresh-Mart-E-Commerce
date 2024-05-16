<template>
  <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4">
    <div class="min-h-screen flex flex-col gap-4">
      <h1 class="font-semibold text-2xl">My Box</h1>
      <div class="grid grid-cols-[2fr_1fr] gap-4">
        <div class="flex flex-col gap-2">

          <label class="shadow border p-2 rounded-md flex gap-3 cursor-pointer has-[:checked]:bg-lime-50 has-[:checked]:border-lime-400 relative"
            v-for="item in cartItems"
            :key="item.id"
          >
            <input :value="item.id" type="checkbox" class="h-5 w-5 accent-lime-400" v-model="cartItemsSelected">
            <div class="h-24 bg-slate-50 rounded-md aspect-square">
              <img :src="`/img/${item.name.toLocaleLowerCase()}.png`" alt="" class="object-contain object-center h-full">
            </div>
            <div class="w-full grid grid-cols-3">
              <div class="flex flex-col">
                <span class="text-lg font-semibold">{{ item.name }}</span>
                <span class="text-base font-semibold">{{ rupiah.format(item.price as number) }}</span>
                <span class="text-sm">Qantity: {{ item.quantity }}</span>
              </div>
              <div class="flex self-center justify-self-center">
                <button class="px-5 py-1 border rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="#888888" d="M5 11v2h14v-2z"/></svg>
                </button>
                <span class="px-5 py-1">{{ item.quantity }}</span>
                <button class="px-5 py-1 border rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="#888888" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
                </button>
              </div>
              <div class="self-center justify-self-center flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#000" d="M7.616 20q-.667 0-1.141-.475T6 18.386V6h-.5q-.213 0-.356-.144T5 5.499t.144-.356T5.5 5H9q0-.31.23-.54t.54-.23h4.46q.31 0 .54.23T15 5h3.5q.213 0 .356.144t.144.357t-.144.356T18.5 6H18v12.385q0 .666-.475 1.14t-1.14.475zM17 6H7v12.385q0 .269.173.442t.443.173h8.769q.269 0 .442-.173t.173-.442zm-6.692 11q.213 0 .357-.144t.143-.356v-8q0-.213-.144-.356T10.307 8t-.356.144t-.143.356v8q0 .213.144.356q.144.144.356.144m3.385 0q.213 0 .356-.144t.143-.356v-8q0-.213-.144-.356Q13.904 8 13.692 8q-.213 0-.357.144t-.143.356v8q0 .213.144.356t.357.144M7 6v13z"/></svg>
                <!-- <svg class="" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#888888" d="m10.562 14.492l-2.496-2.496q-.141-.14-.345-.15t-.363.15t-.16.354t.16.354l2.638 2.638q.242.243.565.243t.566-.243l5.477-5.476q.14-.141.15-.345t-.15-.363t-.354-.16t-.354.16zM12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"/></svg> -->
              </div>
            </div>
          </label>

          <!-- <label class="shadow border p-2 rounded-md flex gap-3">
            <div class=" h-24 bg-slate-50 rounded-md">
              <img src="/img/tomato.png" alt="" class="object-contain object-center h-full">
            </div>
            <div class="w-full grid grid-cols-3">
              <div class="flex flex-col">
                <span class="text-lg font-semibold">Tomato</span>
                <span class="text-sm">Varian: 1 Kg</span>
                <span class="text-sm">Qantity: {{  }}</span>
              </div>
              <div class="flex self-center justify-self-center">
                <button class="px-5 py-1 border rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="#888888" d="M5 11v2h14v-2z"/></svg>
                </button>
                <span class="px-5 py-1">1</span>
                <button class="px-5 py-1 border rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="#888888" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
                </button>
              </div>
              <div class="self-center justify-self-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#888888" d="M7.616 20q-.667 0-1.141-.475T6 18.386V6h-.5q-.213 0-.356-.144T5 5.499t.144-.356T5.5 5H9q0-.31.23-.54t.54-.23h4.46q.31 0 .54.23T15 5h3.5q.213 0 .356.144t.144.357t-.144.356T18.5 6H18v12.385q0 .666-.475 1.14t-1.14.475zM17 6H7v12.385q0 .269.173.442t.443.173h8.769q.269 0 .442-.173t.173-.442zm-6.692 11q.213 0 .357-.144t.143-.356v-8q0-.213-.144-.356T10.307 8t-.356.144t-.143.356v8q0 .213.144.356q.144.144.356.144m3.385 0q.213 0 .356-.144t.143-.356v-8q0-.213-.144-.356Q13.904 8 13.692 8q-.213 0-.357.144t-.143.356v8q0 .213.144.356t.357.144M7 6v13z"/></svg>
              </div>
            </div>
          </label> -->

        </div>

        <div class="reltive">
          <div class="p-4 rounded-md shadow border sticky top-6 flex flex-col gap-4">
            <h1 class="text-lg font-semibold">Detail Pesanan</h1>
            <div class="flex justify-between gap-2 items-center">
              <h1 class="w-full text-sm">Subtotal</h1>
              <span class="justify-self-end text-lg w-full text-end font-semibold">{{ rupiah.format(subtotal) }}</span>
            </div>
            <button class="py-2 px-2 w-full rounded-md shadow border text-center bg-lime-400 text-white disabled:bg-slate-200" :disabled="subtotal <= 0" @click="checkoutItems">Checkout</button>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR'
})

const cartItemsSelected = ref([])
const subtotal = ref<number>(0)

const cartItems: CartItems[] = reactive([])

interface CartItems {
  id: string 
  product_id: string
  quantity: number,
  name: string,
  price: number | string
}

async function getCartItems() {
  const { data } = await useFetch('/api/cart', {
    method: 'GET'
  })

  const response = data.value

  if (response?.data) {
    response.data.forEach((item) => {
      cartItems.push(item as CartItems)
    })
  }
}

await getCartItems()

watchEffect(
  () => {
    const total = cartItemsSelected.value.reduce((acc, id) => {
      const item = cartItems.find((value: CartItems) => value.id === id)

      let subtotal
      if (item) {
        subtotal = parseFloat(item?.price as string) * item.quantity
        return acc + subtotal
      } else {
        return acc
      }
    }, 0)

    subtotal.value = total
  }
)
// const selectItem = (id: string | Event) => {
//   // if (typeof id === 'string') {
//   //   const item = cartItems.filter(value => value.id = id)

//   //   console.log(item)
//   // }
//   console.log(id)
// }

const checkoutItems = async () => {
  const response = await $fetch('/api/cart/checkout', {
    method: 'POST',
    body: {
      items: cartItemsSelected.value
    }
  })

  if (response?.success === true) {
    return navigateTo('/cart/checkout')
  }
}
</script>

<style scoped>

</style>