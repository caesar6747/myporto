<template>
    <br/>
    <form class="w-full">
        <button @click="Post()" @touchend="Post()" type="button" class="max-h-10 ms-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700">Posting</button>
        <div class="w-full" id="ea" v-for="(x, i) in inputs" :key="i">
            <div class="flex">
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
                <div class="w-1/4 ms-2">
                    <form class="max-w-sm mx-auto" v-if="x.attribute.element != ''">
                        <select v-model="x.attribute.tag" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="" disabled>select tag..</option>
                            <option v-if="x.attribute.element == 'header'" value="1">h1</option>
                            <option v-if="x.attribute.element == 'header'" value="2">h2</option>
                            <option v-if="x.attribute.element == 'header'" value="3">h3</option>
                            <option v-if="x.attribute.element == 'header'" value="4">h4</option>
                            <option v-if="x.attribute.element == 'text'" value="5">p</option>
                            <option v-if="x.attribute.element == 'text'" value="6">a</option>
                            <option v-if="x.attribute.element == 'image'" value="7">link</option>
                            <option v-if="x.attribute.element == 'image'" value="8">upload</option>
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
            <div class="flex mt-1 w-full">
                <textarea v-model="x.input" name="input" class="w-11/12 block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
                <button @click="addField(i)" type="button" class="max-h-10 ms-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700">add</button>
            </div>
            <br/>
        </div>
        <br/>
    </form>
</template>

<script setup>
    import {ref} from "vue"
    import axios from 'axios'
    
    const props = defineProps(['contentid'])
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
        //console.log("add clicked ...")
    }

    async function Post(){
        //console.log("post clicked..")
        for(var i=0; i < inputs.value.length; i++){
            //const id = 'b0e80739-5e9e-49c1-8a87-2e0a0db432d9'
            const cont_comp_id = await axios.get('http://caesarnuari.online:3344/api/getcontent/'+props.contentid+'/'+i).then(async (res) => {
                //console.log("dari getcontent api : ", res)
                alert(res)
                if(res.data == ''){
                    await axios.post('http://caesarnuari.online:3344/api/postcontent', {},{
                        params: {
                            i: i,
                            content_id: props.contentid,
                            content: inputs.value[i].input,
                            tag: inputs.value[i].attribute.tag,
                            style: inputs.value[i].attribute.style
                        }
                    }).then( res => {
                        
                    })
                    
                }else{
                    await axios.put('http://caesarnuari.online:3344/api/updatecontent', {},{
                        params: {
                            id: res.data,
                            i: i,
                            content_id: props.contentid,
                            content: inputs.value[i].input,
                            tag: inputs.value[i].attribute.tag == '' ? 5 : inputs.value[i].attribute.tag,
                            style: inputs.value[i].attribute.style
                        }
                    }).then( res => {
                        
                    })
                }
            })
            //console.log("content component id : ", cont_comp_id)
            window.location = '/creator/read/'+props.contentid
        }
    }
</script>

<style>
    .container{
        position: absolute;
        width: 100%;
    }
</style>