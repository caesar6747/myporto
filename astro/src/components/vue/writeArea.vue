<template>
    <form class="container" method="post" action="/writed-content">
        <div class="write-paragraph" id="ea" v-for="(x, i) in inputs">
            <input v-model="x.input" name="input"/>
            <button @click="addField(i)" type="button">add</button>
        </div>
        <button type="submit">Posting</button>
    </form>
</template>

<script setup>
    import {ref, nextTick} from "vue"
    let i = 0

    var inputs = ref([
        {input: `ini ke ${i}`}
    ])

    async function addField(index){
        i++
        inputs.value.splice(index+1, 0, {input: `ini ke ${i}`})
        console.log("add clicked ...")
    }
</script>

<style>
    .container{
        position: absolute;
        width: 100%;
    }
    .write-paragraph{
        position: relative;
        width: 100%;
    }
</style>