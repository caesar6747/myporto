<template>
    <div>
        <label class="w-full">Handling Saudia</label>
        <select class="w-full mb-2 border border-gray-300 rounded-md" v-model="datas.datahandling.handling">
            <option value="" disabled>Pilih Jasa Handling</option>
            <option value="Rp.1.092.000" key="HANDLING SAUDI FULL SERVICE">HANDLING SAUDI FULL SERVICE</option>
            <option value="Rp.1.560.000" key="AIRPORT HANDLING SAUDI">AIRPORT HANDLING SAUDI</option>
        </select>
        <input class="w-full mb-5 border border-gray-300 rounded-md" type="text" v-model="datas.datahandling.handling">

        <label class="w-full">Perlengkapan</label>
        <select class="w-full mb-2 border border-gray-300 rounded-md" v-model="datas.datahandling.perlengkapan">
            <option value="" disabled>Pilih Jasa Handling</option>
            <option value="Rp.200.000">KOPER LENGKAP ASESORIS</option>
            <option value="Rp.320.000">ASESORIS (BATIK, COVER BAG)</option>
        </select>
        <input class="w-full mb-5 border border-gray-300 rounded-md" type="text" v-model="datas.datahandling.perlengkapan">

        <label class="w-full">Asuransi Perjalanan</label>
        <select class="w-full mb-2 border border-gray-300 rounded-md" v-model="datas.datahandling.asuransi">
            <option value="" disabled>Pilih Asuransi</option>
            <option value="Rp.1.200.000">ASURANSI PERJALANAN UMROH</option>
        </select>
        <input class="w-full mb-5 border border-gray-300 rounded-md" type="text" v-model="datas.datahandling.asuransi">

        <label class="w-full">Jasa Manasik</label>
        <select class="w-full mb-2 border border-gray-300 rounded-md" v-model="datas.datahandling.manasik">
            <option value="">Tanpa Jasa Manasik</option>
            <option value="Rp.600.000">MANASIK DI HOTEL</option>
            <option value="Rp.403.000">MANASIK ONLINE</option>
        </select>
        <input class="w-full mb-5 border border-gray-300 rounded-md" type="text" v-model="datas.datahandling.manasik">

        <label class="w-full">Handling Domestik</label>
        <select class="w-full mb-2 border border-gray-300 rounded-md" v-model="datas.datahandling.handlingdom">
            <option value="" disabled>Pilih Handling Domestik</option>
            <option value="Rp.0">HANDLING PP BAGASI + SNACK</option>
            <option value="Rp.600.000">HANDLING PP UPG + NASI DOS</option>
            <option value="Rp.1.403.000">HANDLING PP UPG LOUNGE CONCORDIA</option>
        </select>
        <input class="w-full mb-5 border border-gray-300 rounded-md" type="text" v-model="datas.datahandling.handlingdom">

        <label class="w-full">Visa Umroh</label>
        <select class="w-full mb-2 border border-gray-300 rounded-md" v-model="datas.datahandling.visa">
            <option value="">Tanpa Visa</option>
            <option value="Rp.600.000">VISA SAJA + TASREH RAODAH</option>
        </select>
        <input class="w-full mb-5 border border-gray-300 rounded-md" type="text" v-model="datas.datahandling.visa">

        <label class="w-full">Transportasi</label>
        <select class="w-full mb-2 border border-gray-300 rounded-md" v-model="datas.datahandling.transportasi">
            <option value="">Tanpa Transportasi</option>
            <option value="Rp.60.000">GRATIS BUS VIP</option>
            <option value="Rp.100.000">GRATIS BUS VIP + THAIF</option>
        </select>
        <input class="w-full mb-5 border border-gray-300 rounded-md" type="text" v-model="datas.datahandling.transportasi">
    </div>
</template>

<script setup>
    import {ref} from 'vue'
    const datas = defineProps(['datahandling'])
    const data = ref({
        handling: '',
        perlengkapan: '',
        asuransi: '',
        manasik: '',
        handlingdom: '',
        visa: '',
        transportasi: '',
    })
</script>