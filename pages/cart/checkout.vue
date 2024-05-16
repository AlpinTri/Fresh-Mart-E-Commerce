<template>
  <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4">
    <div class="flex flex-col min-h-screen gap-4">
      <h1 class="font-semibold text-2xl">Shipping Information</h1>
      <div class="grid grid-cols-[2fr_1fr] gap-4">
        <div class="flex flex-col gap-2">
          <div class="border p-4 rounded-md flex flex-col shadow gap-2">
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#888888" d="M12 19.35q3.05-2.8 4.525-5.087T18 10.2q0-2.725-1.737-4.462T12 4T7.738 5.738T6 10.2q0 1.775 1.475 4.063T12 19.35m0 1.975q-.35 0-.7-.125t-.625-.375Q9.05 19.325 7.8 17.9t-2.087-2.762t-1.275-2.575T4 10.2q0-3.75 2.413-5.975T12 2t5.588 2.225T20 10.2q0 1.125-.437 2.363t-1.275 2.575T16.2 17.9t-2.875 2.925q-.275.25-.625.375t-.7.125M12 12q.825 0 1.413-.587T14 10t-.587-1.412T12 8t-1.412.588T10 10t.588 1.413T12 12"/></svg>
              <span class="font-semibold text-lg">Alamat Pengiriman</span>
            </div>

            <div class="flex flex-col gap-4">
              <div class="input-inline flex gap-2">
                <div class="flex flex-col w-full">
                  <label for="" class="text-sm font-semibold">Provinsi</label>
                  <select class=" p-2 text-sm rounded border outline-none shadow-sm" v-model="userShippingInformation.province">
                    <option selected hidden disabled value="">Pilih provinsi</option>
                    <option v-for="province in shippingStorage.provinces" :key="province.province_id" :value="province.province_id">{{ province.province }}</option>
                  </select>
                </div>
                <div class="flex flex-col w-full">
                  <label for="" class="text-sm font-semibold">Kabupaten / Kota</label>
                  <select v-model="userShippingInformation.city" class="p-2 text-sm rounded border outline-none disabled:bg-slate-50 shadow-sm" :disabled="!userShippingInformation.province">
                    <option selected hidden disabled value="">Pilih Kabupaten / Kota</option>
                    <option :value="city.city_id" v-for="city in cityProvince" :key="city.city_id">{{ city.city_name }}</option>
                  </select>
                </div>
              </div>
              <div class="flex flex-col w-full">
                <label for="" class="text-sm font-semibold">Alamat Lengkap</label>
                <textarea v-model="userShippingInformation.address" name="" id="" cols="30" rows="8" class="p-2 text-sm rounded border outline-none disabled:bg-slate-50 shadow-sm" placeholder="Nama jalan / perumahan"></textarea>
              </div>
              <div class="flex flex-col w-full">
                <label for="" class="text-sm font-semibold">Kurir</label>
                <select v-model="userShippingInformation.courier" class=" p-2 text-sm rounded border outline-none shadow-sm disabled:bg-slate-50" :disabled="!userShippingInformation.city">
                  <option selected hidden disabled value="">Pilih kurir yang kamu mau</option>
                  <option value="jne">JNE</option>
                  <option value="pos">POS INDONESIA</option>
                  <option value="tiki">TIKI</option>
                </select>
              </div>
              <div class="grid grid-cols-3 gap-2" v-if="userShippingInformation.courier">
                <label class="p-4 rounded shadow border flex flex-col has-[:checked]:bg-lime-50 has-[:checked]:border-lime-400"
                  v-for="service in courierService"
                >
                  <h3 class="font-semibold">{{ service.service }}</h3>
                  <span class="test-sm">{{ service.description }}</span>
                  <span class="text-sm">Estimasi: {{ service.cost[0].etd }}</span>
                  <span class="font-semibold text-lg">{{ rupiah.format(service.cost[0].value as number) }}</span>
                  <input type="radio" name="service" class="hidden" id="service-1" :value="service.cost[0].value" v-model="userShippingInformation.servicePrice">
                </label>
              </div>
            </div>
            <!-- <div>
              Benteng Jaya, Tunggak jati, RT.001/RW.014, Karawang, Jawa Barat (Patokannya Masjid Jamie Al-Hikmah), Karawang Barat, Kab. Karawang, Jawa Barat, 6289678320480
            </div> -->
            <div>
              <button class="border px-3 py-2 rounded-md bg-slate-50 text-sm">Simpan Alamat</button>
            </div>
          </div>

          <div class="border p-4 rounded-md flex flex-col shadow gap-4">
            <div class="flex gap-4" v-for="item in checkoutItems">
              <div class=" h-24 bg-slate-50 rounded-md aspect-square p-2">
                <img :src="`/img/${item.name.toLowerCase()}.png`" alt="" class="object-contain object-center h-full">
              </div>

              <div class="grid grid-cols-2 w-full">
                <div class="flex flex-col">
                  <span class="text-lg font-semibold">{{ item.name }}</span>
                  <!-- <span class="text-sm">Varian: 1 Kg</span> -->
                  <span class="text-sm">Qantity: {{ item.quantity }}</span>
                </div>
                <div class="justify-self-end">
                  <h1 class="text-lg font-semibold">{{ `${item.quantity} x ${rupiah.format(item.price)}` }}</h1>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="flex relative flex-col">
          <div class="border p-4 rounded-md flex flex-col shadow sticky top-10">
            <div class="flex justify-between py-1">
              <span>Subtotal</span>
              <span>{{ rupiah.format(subtotal) }}</span>
            </div>
            <div class="flex justify-between py-1" v-if="userShippingInformation.servicePrice">
              <span>Biaya Pengiriman</span>
              <span>{{ rupiah.format(parseInt(userShippingInformation.servicePrice)) }}</span>
            </div>
            <!-- <div class="flex justify-between py-1">
              <span>Potongan Harga</span>
              <span>-Rp10.000</span>
            </div> -->
            <div class="flex justify-between py-2 border-t text-lg font-semibold">
              <span>Total</span>
              <span>{{ rupiah.format(total) }}</span>
            </div>
            <button class="py-2 px-2 w-full rounded-md shadow border text-center bg-lime-400 text-white text-sm" @click="payUseQR">
              Bayar dengan QRIS sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const shippingStorage = useShippingStore()

const courierService = reactive([])

const cityProvince = reactive([])

const userShippingInformation = reactive({
  province: '',
  city: '',
  address: '',
  courier: '',
  servicePrice: 0
})

const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR'
})

const checkoutItems: any[] = reactive([])
const total = ref(0)
const subtotal = ref(0)

const shippings = [
  { id: 1, type: 'Regular', unavailable: false },
  { id: 2, type: 'Express', unavailable: false },
  { id: 3, type: 'Cargo', unavailable: false }
]
const selectedShipping = ref(shippings[0])

const getShippingInfo = async () => {
  try {
    
    const {data} = await useFetch('/api/shipping', {
      method: 'GET'
    })
  
    const resData = data.value
  
    if (resData) {
      shippingStorage.setProvince(resData.data.province)
      shippingStorage.setCity(resData.data.cities)
    }
  } catch (err) {
    console.error(err)
  }
}

const getCheckoutItems = async () => {
  try { 
    const { data } = await useFetch('/api/cart/checkout', {
      method: 'GET'
    })

    const resData = data.value

    if (resData) {
      resData.data.items.forEach(item => checkoutItems.push(item))
      // console.log(resData.data.total)
      subtotal.value = resData.data.subtotal
    }
  } catch (error) {
    console.error('error => ', error)
  }
}

await getCheckoutItems()
await getShippingInfo()

watch(
  () => userShippingInformation.province,
  () => {
    const cities = shippingStorage.cities.filter(item => item.province_id === userShippingInformation.province)
    cityProvince.length = 0
    cities.forEach(item => cityProvince.push(item))
  }
)

watch(
  () => userShippingInformation.courier,
  async () => {
    try {
      const response = await $fetch('/api/shipping/cost', {
        method: 'GET',
        query: {
          city: userShippingInformation.city,
          courier: userShippingInformation.courier
        }
      })

      if (response?.success === true) {
        courierService.length = 0
        response.data[0].costs.forEach(item => courierService.push(item))

        console.log(courierService)
      }
    } catch (err) {
      
    }
  }
)

watch(
  () => userShippingInformation.servicePrice,
  () => {
    total.value = subtotal.value + userShippingInformation.servicePrice
  }
)

const payUseQR = async () => {
  try {
    const city = shippingStorage.cities.find(item => item.city_id === userShippingInformation.city)

    console.log(city)
    const response = await $fetch('/api/pay', {
      method: 'POST',
      body: {
        total: total.value,
        address: `${userShippingInformation.address} - ${city.city_name} - ${city.province}`
      }
    })

    console.log('response => ', response)
  } catch (err) {
    console.log('err => ', err )
  }
}
</script>

<style scoped>

</style>