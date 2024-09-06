<template>
    <h2 class="font-semibold text-xl mb-10">Detail Informasi</h2>
    <div class="grid grid-cols-2">
        <label class="font-semibold mb-2">Periode Bulan</label>
        <label class="text-right">{{props.pageone.periode}}</label>
        <label class="font-semibold mb-2">Tanggal Berangkat</label>
        <label class="text-right">{{ props.pageone.tglberangkat}}</label>
        <label class="font-semibold mb-2">Tanggal Pulang</label>
        <label class="text-right">{{ props.pageone.tglpulang }}</label>
        <label class="font-semibold mb-2">Berangkat Dari</label>
        <label class="text-right">{{ props.pageone.dari }}</label>
        <label class="font-semibold mb-2">Tujuan Ke</label>
        <label class="text-right">{{ props.pageone.tujuan }}</label>
        <label class="font-semibold mb-2">Paket Hari</label>
        <label class="text-right">{{ props.pageone.pakethari }}</label>
        <label class="font-semibold mb-2">Maskapai</label>
        <label class="text-right">{{ props.pageone.maskapai }}</label>
        <label class="font-semibold mb-2">Jumlah Peserta</label>
        <label class="text-right">{{ props.pageone.peserta }}</label>
    </div>
    <hr class="mt-5 mb-10"/>
    <div class="grid grid-cols-2 mb-5">
        <label class="font-semibold mb-2">Vendor</label>
        <label class="text-right">{{props.hotelmadinah.vendor}}</label>
        <label class="font-semibold mb-2">Hotel Madinah</label>
        <label class="text-right">{{ props.hotelmadinah.hotelmadinah}}</label>
        <label class="font-semibold mb-2">Hotel Bintang</label>
        <label class="text-right">{{ props.hotelmadinah.hotelbintang }}</label>
        <label class="font-semibold mb-2">Jumlah Hari</label>
        <label class="text-right">{{ props.hotelmadinah.durasi }}</label>
        <label class="font-semibold mb-2">Tanggal Masuk</label>
        <label class="text-right">{{ props.hotelmadinah.tglmasuk }}</label>
        <label class="font-semibold mb-2">Tanggal Keluar</label>
        <label class="text-right">{{ props.hotelmadinah.tglkeluar }}</label>
    </div>
    <div class="grid grid-cols-2">
        <label class="font-semibold mb-2">Vendor</label>
        <label class="text-right">{{props.hotelmakkah.vendor}}</label>
        <label class="font-semibold mb-2">Hotel Makkah</label>
        <label class="text-right">{{ props.hotelmakkah.hotelmakkah}}</label>
        <label class="font-semibold mb-2">Hotel Bintang</label>
        <label class="text-right">{{ props.hotelmakkah.hotelbintang }}</label>
        <label class="font-semibold mb-2">Jumlah Hari</label>
        <label class="text-right">{{ props.hotelmakkah.durasi}}</label>
        <label class="font-semibold mb-2">Tanggal Masuk</label>
        <label class="text-right">{{ props.hotelmakkah.tglmasuk }}</label>
        <label class="font-semibold mb-2">Tanggal Keluar</label>
        <label class="text-right">{{ props.hotelmakkah.tglkeluar }}</label>
    </div>
    <hr class="mt-5 mb-10"/>
    <div class="grid grid-cols-2">
        <label class="font-semibold mb-2">Handling</label>
        <label class="text-right">{{handlinglist.handling[props.datahandling.handling]}}</label>
        <label class="font-semibold mb-2">Mutawif</label>
        <label class="text-right">{{ props.datahandling.mutawif}}</label>
        <label class="font-semibold mb-2">Perlengkapan</label>
        <label class="text-right">{{handlinglist.perlengkapan[props.datahandling.perlengkapan]}}</label>
        <label class="font-semibold mb-2">Visa Umroh</label>
        <label class="text-right">{{ props.datahandling.visa }}</label>
        <label class="font-semibold mb-2">Transportasi</label>
        <label class="text-right">{{ props.datahandling.transportasi }}</label>
        <label class="font-semibold mb-2">Asuransi Perjalanan</label>
        <label class="text-right">{{handlinglist.asuransi[props.datahandling.asuransi]}}</label>
        <label class="font-semibold mb-2">Jasa Manasik</label>
        <label class="text-right">{{handlinglist.manasik[props.datahandling.manasik]}}</label>
        <label class="font-semibold mb-2">Handling Domestik</label>
        <label class="text-right">{{ props.datahandling.handlingdom }}</label>
    </div>
    <hr class="mt-5 mb-10"/>
    <div class="grid grid-cols-2">
        <label class="font-semibold mb-2">Tiket Pesawat</label>
        <label class="text-right">{{hargatiket[props.pageone.maskapai]}}</label>
        <label class="font-semibold mb-2">Hotel Madinah</label>
        <label class="text-right">{{}}</label>
        <label class="font-semibold mb-2">Hotel Mekkah</label>
        <label class="text-right">{{}}</label>
        <label class="font-semibold mb-2">Handling</label>
        <label class="text-right">{{props.datahandling.handling}}</label>
        <label class="font-semibold mb-2">Mutawif</label>
        <label class="text-right">{{ props.datahandling.mutawif}}</label>
        <label class="font-semibold mb-2">Perlengkapan</label>
        <label class="text-right">{{props.datahandling.perlengkapan}}</label>
        <label class="font-semibold mb-2">Visa Umroh</label>
        <label class="text-right">{{ props.datahandling.visa }}</label>
        <label class="font-semibold mb-2">Transportasi</label>
        <label class="text-right">{{ props.datahandling.transportasi }}</label>
        <label class="font-semibold mb-2">Asuransi Perjalanan</label>
        <label class="text-right">{{props.datahandling.asuransi}}</label>
        <label class="font-semibold mb-2">Jasa Manasik</label>
        <label class="text-right">{{props.datahandling.manasik}}</label>
        <label class="font-semibold mb-2">Handling Domestik</label>
        <label class="text-right">{{ props.datahandling.handlingdom }}</label>
    </div>
    <hr class="mt-5 mb-10"/>
    <div class="grid grid-cols-2 mb-10">
        <label class="font-semibold mb-2">Total</label>
        <label class="text-right">{{total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}}</label>
    </div>
</template>

<script setup>
    import {onMounted, ref} from 'vue'

    const total = ref(0)
    const props = defineProps([
        'pageone',
        'hotelmadinah',
        'hotelmakkah',
        'datahandling',
    ])

    const handlinglist = ref({
        handling: {
            'Rp.1.092.000': 'HANDLING SAUDI FULL SERVICE',
            'Rp.1.560.000': 'AIRPORT HANDLING SAUDI',
        },
        perlengkapan: {
            'Rp.200.000': 'KOPER LENGKAP ASESORIS',
            'Rp.320.000': 'ASESORIS (BATIK, COVER BAG)',
        },
        asuransi: {
            'Rp.1.200.000': 'ASURANSI PERJALANAN UMROH',
        },
        manasik: {
            'Rp.600.000': 'MANASIK DI HOTEL',
            'Rp.403.000': 'MANASIK ONLINE',
        }
    })

    const hargatiket = ref({
        'GARUDA INDONESIA': 'Rp.17.900.000',
        'LION': 'Rp.16.200.000',
        'AIR-ASIA': 'Rp.15.500.000',
    })

    function extractNumber(string) {
        //console.log("prepare : ", string)
        if(string != null){
            const numberString = string.replace(/[^0-9]/g, ''); // Remove non-numeric characters
            const number = parseInt(numberString)
            //console.log("extract : ",string, " = ", number)
            if(isNaN(number)){
                return 0
            }else{
                return number
            }
        }else{
            return 0
        }
    }

    function sumNumbers(numbers) {
        let sum = 0;
        for (let i = 0; i < numbers.length; i++) {
            sum += numbers[i];
        }
        return sum;
    }

    onMounted(() => {
        console.log(props)
        const array = [extractNumber(hargatiket.value[props.pageone.maskapai]), 
                        extractNumber(props.datahandling.handling), 
                        extractNumber(props.datahandling.manasik),
                        extractNumber(props.datahandling.mutawif),
                        extractNumber(props.datahandling.visa),
                        extractNumber(props.datahandling.perlengkapan),
                        extractNumber(props.datahandling.transportasi),
                        extractNumber(props.datahandling.handlingdom)
                    ]
        console.log(array)
        total.value = sumNumbers(array)
    })
</script>