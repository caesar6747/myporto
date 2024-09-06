<template>
    <div class="w-full">
        <form>
            <div v-if="page == 0">
                <h2 class="font-bold text-2xl mb-10">Tambah Produk</h2>
                <label class="w-full">Periode Bulan</label>
                <select class="w-full mb-10 border border-gray-300 rounded-md" v-model="data.periode">
                    <option value="" disabled>Pilih periode</option>
                    <option value="1 SEPT - 30 OKT 2024">1 SEPT - 30 OKT 2024</option>
                    <option value="1 NOV - 10 DES 2024">1 NOV - 10 DES 2024</option>
                    <option value="11 DES - 11 JAN 2025">11 DES - 11 JAN 2025</option>
                    <option value="11 JAN - 28 FEB 2025">11 JAN - 28 FEB 2025</option>
                </select>
                <label class="w-full">Tanggal Berangkat</label>
                <input class="w-full mb-10 border border-gray-300 rounded-md" v-model="data.tglberangkat" type="date"/>
                <div class="flex gap-5">
                    <label class="w-1/2">Berangkat Dari :</label>
                    <label class="w-1/2">Tujuan Ke :</label>
                </div>
                <div class="flex gap-5 mb-10">
                    <select class="w-1/2 border border-gray-300 rounded-md" v-model="data.dari">
                        <option value="" disabled>Berangkat dari</option>
                        <option value="MAKASAR">MAKASAR</option>
                        <option value="JAKARTA">JAKARTA</option>
                        <option value="SURABAYA">SURABAYA</option>
                        <option value="PALEMBANG">PALEMBANG</option>
                        <option value="BANJARMASIN">BANJARMASIN</option>
                        <option value="MEDAN">MEDAN</option>
                        <option value="KENDARI">KENDARI</option>
                    </select>
                    <select class="w-1/2 border border-gray-300 rounded-md" v-model="data.tujuan">
                        <option value="" disabled>Tujuan ke</option>
                        <option value="JEDDAH">Jeddah</option>
                        <option value="MADINAH">Madinah</option>
                    </select>
                </div>
                <label class="w-full">Paket Hari</label>
                <select class="w-full mb-10 border border-gray-300 rounded-md" v-model="data.pakethari">
                    <option value="" disabled>Pilih Hari</option>
                    <option value="9">9 Hari</option>
                    <option value="12">12 Hari</option>
                    <option value="13">13 Hari</option>
                    <option value="15">15 Hari</option>
                    <option value="20">20 Hari</option>
                    <option value="30">30 Hari</option>
                </select>
                <label class="w-full">Tanggal Pulang</label>
                <input class="w-full mb-10 border border-gray-300 rounded-md" v-model="data.tglpulang" type="date"/>
                <div class="flex gap-5">
                    <label class="w-1/2">Pulang Dari :</label>
                    <label class="w-1/2">Tujuan Ke :</label>
                </div>
                <div class="flex gap-5 mb-10">
                    <select class="w-1/2 border border-gray-300 rounded-md" v-model="data.pulangdari">
                        <option value="" disabled>Berangkat Dari</option>
                        <option value="JEDDAH">Jeddah</option>
                        <option value="MADINAH">Madinah</option>
                    </select>
                    <select class="w-1/2 border border-gray-300 rounded-md" v-model="data.tujuanpulang">
                        <option value="" disabled>Tujuan ke</option>
                        <option value="MAKASAR">MAKASAR</option>
                        <option value="JAKARTA">JAKARTA</option>
                        <option value="SURABAYA">SURABAYA</option>
                        <option value="PALEMBANG">PALEMBANG</option>
                        <option value="BANJARMASIN">BANJARMASIN</option>
                        <option value="MEDAN">MEDAN</option>
                        <option value="KENDARI">KENDARI</option>
                    </select>
                </div>
                <label class="w-full">Maskapai</label>
                <select class="w-full mb-10 border border-gray-300 rounded-md" v-model="data.maskapai">
                    <option value="" disabled>Pilih Maskapai</option>
                    <option value="GARUDA INDONESIA">GARUDA INDONESIA UPG-CKG-JED Rp.17.900.000</option>
                    <option value="LION">LION UPG-JED Rp.16.200.000</option>
                    <option value="AIR-ASIA">AIR ASIA UPG-KUL-JED Rp.15.500.000</option>
                </select>
                <label class="w-full">Jumlah Peserta</label>
                <select class="w-full mb-10 border border-gray-300 rounded-md" v-model="data.peserta">
                    <option value="" disabled>Pilih Jumlah Peserta</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                </select>
            </div>
            <div v-if="page == 1">
                <label class="w-full">Pilih Vendor</label>
                <select class="w-full mb-10 border border-gray-300 rounded-md" v-model="datahotelmadinah.vendor">
                    <option value="" disabled>Pilih Vendor</option>
                    <option value="ROWA">ROWA</option>
                    <option value="HEAVEN">HEAVEN</option>
                    <option value="AREEJ TABAH">AREEJ TABAH</option>
                    <option value="DIYAR ALDHIWANIA">DIYAR ALDIWANIA</option>
                    <option value="AMNA GRUB">AMNA GRUB</option>
                    <option value="LOCATEL">LOCATEL</option>
                </select>
                <label class="w-full">Hotel Bintang</label>
                <select class="w-full mb-10 border border-gray-300 rounded-md" v-model="datahotelmadinah.hotelbintang">
                    <option value="" disabled>Pilih Hotel Bintang</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <label class="w-full">Hotel Madinah</label>
                <select class="w-full mb-10 border border-gray-300 rounded-md" v-model="datahotelmadinah.hotelmadinah">
                    <option value="" disabled>Pilih Hotel Madinah</option>
                    <option value="RAMA AL MADINAH">RAMA AL MADINAH (Quad) - Rp.537.500</option>
                    <option value="BIR AL EIMAN">BIR AL EIMAN (Quad) - Rp.515.000</option>
                    <option value="SIDRA AL MADINAH">SIDRA AL MADINAH (Quad) - Rp.535.500</option>
                </select>
                <div class="flex gap-5">
                    <label class="w-1/2">Durasi Hari :</label>
                    <label class="w-1/2">Hotel + Makan :</label>
                </div>
                <div class="flex gap-5 mb-10">
                    <select class="w-1/2 border border-gray-300 rounded-md" v-model="datahotelmadinah.durasi">
                        <option value="" disabled>Pilih Durasi</option>
                        <option value="City Tour - 1 Hari">City Tour - 1 Hari</option>
                        <option value="1 Malam - 2 Hari">1 Malam - 2 Hari</option>
                        <option value="2 Malam - 3 Hari">2 Malam - 3 Hari</option>
                        <option value="3 Malam - 4 Hari">3 Malam - 4 Hari</option>
                        <option value="4 Malam - 5 Hari">4 Malam - 5 Hari</option>
                    </select>
                    <select class="w-1/2 border border-gray-300 rounded-md" v-model="datahotelmadinah.hotelmakan">
                        <option value="" disabled>Tujuan ke</option>
                        <option value="JEDDAH">Jeddah</option>
                        <option value="MADINAH">Madinah</option>
                    </select>
                </div>
                <div class="flex gap-5">
                    <label class="w-1/2">Tanggal Masuk :</label>
                    <label class="w-1/2">Tanggal Keluar :</label>
                </div>
                <div class="flex gap-5 mb-10">
                    <input class="w-1/2 border border-gray-300 rounded-md" type="date" v-model="datahotelmadinah.tglmasuk"/>
                    <input class="w-1/2 border border-gray-300 rounded-md" type="date" v-model="datahotelmadinah.tglkeluar"/>
                </div>

                <label class="w-full">Pilih Vendor</label>
                <select class="w-full mb-10 border border-gray-300 rounded-md" v-model="datahotelmakkah.vendor">
                    <option value="" disabled>Pilih Vendor</option>
                    <option value="ROWA">ROWA</option>
                    <option value="HEAVEN">HEAVEN</option>
                    <option value="AREEJ TABAH">AREEJ TABAH</option>
                    <option value="DIYAR ALDHIWANIA">DIYAR ALDIWANIA</option>
                    <option value="AMNA GRUB">AMNA GRUB</option>
                    <option value="LOCATEL">LOCATEL</option>
                </select>
                <label class="w-full">Hotel Bintang</label>
                <select class="w-full mb-10 border border-gray-300 rounded-md" v-model="datahotelmakkah.hotelbintang">
                    <option value="" disabled>Pilih Hotel Bintang</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <label class="w-full">Hotel Makkah</label>
                <select class="w-full mb-10 border border-gray-300 rounded-md" v-model="datahotelmakkah.hotelmakkah">
                    <option value="" disabled>Pilih Hotel Madinah</option>
                    <option value="RAYAH KAYAN">RAYAH KAYAN (Quad) - Rp.402.500</option>
                    <option value="DURRAT KAYAN">DURRAT KAYAN (Quad) - Rp.380.000</option>
                    <option value="BAKKAH ROYAL">BAKKAH ROYAL (Quad) - Rp.368.500</option>
                </select>
                <div class="flex gap-5">
                    <label class="w-1/2">Durasi Hari :</label>
                    <label class="w-1/2">Hotel + Makan :</label>
                </div>
                <div class="flex gap-5 mb-10">
                    <select class="w-1/2 border border-gray-300 rounded-md" v-model="datahotelmakkah.durasi">
                        <option value="" disabled>Pilih Durasi</option>
                        <option value="City Tour - 1 Hari">City Tour - 1 Hari</option>
                        <option value="1 Malam - 2 Hari">1 Malam - 2 Hari</option>
                        <option value="2 Malam - 3 Hari">2 Malam - 3 Hari</option>
                        <option value="3 Malam - 4 Hari">3 Malam - 4 Hari</option>
                        <option value="4 Malam - 5 Hari">4 Malam - 5 Hari</option>
                    </select>
                    <select class="w-1/2 border border-gray-300 rounded-md" v-model="datahotelmakkah.hotelmakan">
                        <option value="" disabled>Tujuan ke</option>
                        <option value="JEDDAH">Jeddah</option>
                        <option value="MADINAH">Madinah</option>
                    </select>
                </div>
                <div class="flex gap-5">
                    <label class="w-1/2">Tanggal Masuk :</label>
                    <label class="w-1/2">Tanggal Keluar :</label>
                </div>
                <div class="flex gap-5 mb-10">
                    <input class="w-1/2 border border-gray-300 rounded-md" type="date" v-model="datahotelmakkah.tglmasuk"/>
                    <input class="w-1/2 border border-gray-300 rounded-md" type="date" v-model="datahotelmakkah.tglkeluar"/>
                </div>
            </div>
            <div class="w-full" v-if="page == 2">
                <PageThree v-bind:datahandling="datahandling"/>
            </div>
            <div class="w-full" v-if="page == 3">
                <PageFourth v-bind:pageone="data" 
                            v-bind:hotelmadinah="datahotelmadinah" 
                            v-bind:hotelmakkah="datahotelmakkah"
                            v-bind:datahandling="datahandling"
                />
            </div>
        </form>
        <button id="but-prev" type="button" @click="prev" class="max-h-10 ms-2 text-white enabled:bg-blue-700 enabled:hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 enabled:dark:bg-blue-600 enabled:dark:hover:bg-blue-700 disabled:opacity-55 disabled:bg-gray-500" disabled>sebelum</button>
        <button type="button" @click="next" class="max-h-10 ms-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700">berikutnya</button>
        <hr class="mb-10 mt-2"/>
    </div>
</template>

<script setup>
    import {ref} from 'vue'
    import PageThree from './test2.vue'
    import PageFourth from './test3.vue'

    const page = ref(0)
    const data = ref({
        periode: '',
        tglberangkat: '',
        dari: '',
        tujuan: '',
        pakethari: '',
        tglpulang: '',
        pulangdari: '',
        tujuanpulang: '',
        maskapai: '',
        peserta: '',
    })

    const datahotelmadinah = ref({
        vendor: '',
        hotelbintang: '',
        hotelmadinah: '',
        durasi: '',
        hotelmakan: '',
        tglmasuk: '',
        tglkeluar: '',
    })

    const datahotelmakkah = ref({
        vendor: '',
        hotelbintang: '',
        hotelmakkah: '',
        durasi: '',
        hotelmakan: '',
        tglmasuk: '',
        tglkeluar: '',
    })

    const datahandling = ref({
        handling: '',
        perlengkapan: '',
        asuransi: '',
        manasik: '',
        handlingdom: '',
        visa: '',
        transportasi: '',
    })

    function next(){
        console.log("page : ", page.value)
        if(page.value >= 0 && page.value < 3){
            page.value = page.value + 1
        }
        if(page.value > 0){
            console.log("button prev enable")
            const button = document.getElementById('but-prev')
            button.disabled = false
        }
    }

    function prev(){
        if(page.value > 0 && page.value <= 3){
            page.value = page.value - 1
        }
        if(page.value == 0){
            console.log("button prev disabled")
            const button = document.getElementById('but-prev')
            button.disabled = true
        }
    }
</script>