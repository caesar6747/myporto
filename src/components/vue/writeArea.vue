<template>
    <br/>
    <form class="container">
        <div class="write-paragraph" id="ea" v-for="(x, i) in inputs">
            <div class="flex w-100">
                <div class="w-1/4">
                    <form class="max-w-sm mx-auto">
                        <select v-model="x.attribute.element" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="" disabled>select element..</option>
                            <option value="text">Text</option>
                            <option value="header">Header</option>
                            <option value="image">Image</option>
                        </select>
                    </form>
                    <p>{{element}}</p>
                </div>
                <div class="w-1/4 ms-2" v-if="x.attribute.element == 'text'">
                    <form class="max-w-sm mx-auto">
                        <select v-model="x.attribute.tag" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="" disabled>select tag..</option>
                            <option value="5">p</option>
                            <option value="6">a</option>
                        </select>
                    </form>
                </div>
                <div class="w-1/4 ms-2" v-else-if="x.attribute.element == 'header'">
                    <form class="max-w-sm mx-auto">
                        <select v-model="x.attribute.tag" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="" disabled>select tag..</option>
                            <option value="1">h1</option>
                            <option value="2">h2</option>
                            <option value="3">h1</option>
                            <option value="4">h2</option>
                        </select>
                    </form>
                </div>
                <div class="w-1/4 ms-2" v-else-if="x.attribute.element == 'image'">
                    <form class="max-w-sm mx-auto">
                        <select v-model="x.attribute.tag" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="" disabled>select tag..</option>
                            <option value="7">link</option>
                            <option value="7">upload</option>
                        </select>
                    </form>
                </div>
                <div class="w-1/4 ms-2" v-if="x.attribute.element == 'header'">
                    <form class="max-w-sm mx-auto">
                        <select v-model="x.attribute.style" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="" disabled>select tag..</option>
                            <option value="2,4,8,6,1">brown</option>
                            <option value="7,4,2,3,5">green</option>
                        </select>
                    </form>
                </div>
            </div>
            <div class="flex mt-1">
                <textarea v-model="x.input" name="input" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
                <button @click="addField(i)" type="button" class="max-h-10 ms-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700">add</button>
            </div>
            <br/>
        </div>
        <br/>
        <button @click="Post()" type="button" class="max-h-10 ms-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700">Posting</button>
    </form>
</template>

<script setup>
    import {ref} from "vue"
    import axios from 'axios'

    let i = 0

    const inputs = ref([
        {
            input: `ini ke ${i}`,
            attribute: {
                element: '',
                tag: '',
                style: ''
            }
        }
    ])

    async function addField(index){
        i++
        inputs.value.splice(index+1, 0, {
            input: `ini ke ${i}`,
            attribute: {
                element: '',
                tag: '',
                style: ''
            }
        })
        console.log("add clicked ...")
    }

    async function Post(){
        console.log("post clicked..")
        for(var i=0; i < inputs.value.length; i++){
            console.log(inputs.value[i].input)
            await axios.post('http://localhost:3344/api/postcontent', {
                i: i,
                content_id: 'dsafas',
                content: inputs.value[i].input,
                tag: inputs.value[i].attribute.tag,
                style: inputs.value[i].attribute.style
            },{
                params: {
                    content: 'sadfasds',
                    i: i
                }
            }).then( res => {
                console.log(res)
            })
        }
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