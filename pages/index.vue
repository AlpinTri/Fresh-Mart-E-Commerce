<template>
  <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4">
    <div class="w-full flex flex-col space-y-2">
      <h1 class=" text-lg font-semibold">Kategori</h1>
      <div class="relative w-full flex rounded-md border shadow p-4 space-x-4 overflow-x-auto">
        <div v-for="(item, index) in total" :key="index" class="flex flex-col items-center p-1 border px-4 rounded-md cursor-pointer hover:shadow-sm">
          <div>
            <img :src="item.img" alt="" class="max-h-12">
          </div>
          <span class="text-sm font-semibold">{{ item.name }}</span>
        </div>
      </div>
    </div>

    <div class="w-full flex flex-col space-y-2 mt-4">
      <h1 class=" text-lg font-semibold">Buah & Sayur Segar</h1>

      <div class="mt-6 grid grid-cols-2 gap-4 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 md:grid-cols-5">
        <div v-for="product in products" :key="product.id" class="group relative shadow-sm border rounded-md w-full hover:shadow">
          <div class="w-full overflow-hidden rounded-t-md bg-slate-50">
            <img :src="`/img/${product.name.toLocaleLowerCase()}.png`" class="w-full aspect-square object-contain object-center" />
          </div>
          <div class="p-4 flex flex-col justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                <a :href="`/products/${product.id}`" class="line-clamp-2 text-ellipsis">
                  <span aria-hidden="true" class="absolute inset-0" />
                  {{ product.name }}
                </a>
              </h3>
            </div>
            <div class="flex justify-between pt-2 items-end">
              <div class="flex flex-col">
                <p class="text-xs font-semibold text-gray-400 line-through">{{ rupiah.format(product.price) }}</p>
                <p class="text-sm font-semibold text-gray-900">{{ rupiah.format(product.price) }}</p>
              </div>
              <!-- <span class="absolute bottom-0 right-0 text-xs rounded-tl-md rounded-br-md text-white p-1 bg-lime-500 h-fit text-center w-fit">50% OFF</span> -->
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
const total = [
  { name: 'Buah', href: '#', img: '/img/fruit.png' },
  { name: 'Sayur', href: '#', img: '/img/vegetable.png' },
];

// const products = [
//   {
//     id: 1,
//     name: 'Avocado',
//     href: `/products/1`,
//     imageSrc: '/img/avocado-apiece.webp',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: 'Rp20.000',
//     color: 'Black',
//   },
//   {
//     id: 1,
//     name: 'Banana',
//     href: '#',
//     imageSrc: '/img/banana.png',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: 'Rp20.000',
//     color: 'Black',
//   },
//   {
//     id: 1,
//     name: 'Carrot',
//     href: '#',
//     imageSrc: '/img/carrot.png',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: 'Rp20.000',
//     color: 'Black',
//   },
//   {
//     id: 1,
//     name: 'Chili',
//     href: '#',
//     imageSrc: '/img/chilli.png',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: 'Rp20.000',
//     color: 'Black',
//   },
//   {
//     id: 1,
//     name: 'Apple',
//     href: '#',
//     imageSrc: '/img/red-apple.webp',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: 'Rp20.000',
//     color: 'Black',
//   },
//   {
//     id: 1,
//     name: 'Dragon Fruit',
//     href: '#',
//     imageSrc: '/img/dragon-fruit.webp',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: 'Rp20.000',
//     color: 'Black',
//   },
//   {
//     id: 1,
//     name: 'Orange',
//     href: '#',
//     imageSrc: '/img/orange.webp',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: 'Rp20.000',
//     color: 'Black',
//   },
//   {
//     id: 1,
//     name: 'Tomato',
//     href: '#',
//     imageSrc: '/img/tomato.png',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: 'Rp20.000',
//     color: 'Black',
//   },
//   {
//     id: 1,
//     name: 'Lettuce',
//     href: '#',
//     imageSrc: '/img/lettuce.webp',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: 'Rp20.000',
//     color: 'Black',
//   },
//   {
//     id: 1,
//     name: 'Mustard',
//     href: '#',
//     imageSrc: '/img/mustard.png',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: 'Rp20.000',
//     color: 'Black',
//   },
//   {
//     id: 1,
//     name: 'Paprika',
//     href: '#',
//     imageSrc: '/img/paprika.png',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: 'Rp20.000',
//     color: 'Black',
//   },
//   // More products...
// ];

interface Product {
  id: string
  name: string
  category_id: string
  price: number
}

const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR'
})

const products = reactive<Product[]>([]);

async function getProducts() {
  // const response: {success: boolean, message: string, data: Product[]} = await $fetch('/api/products/', {
  //   method: 'GET',
  // })
  const {data} = await useFetch('/api/products/', {
    method: 'GET',
  })

  const response = data.value

  if (response?.success === true) {
    response.data.forEach(item => products.push(item as Product))
  }
}

getProducts()
</script>

<style scoped>

</style>