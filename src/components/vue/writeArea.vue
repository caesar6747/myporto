<template>
    <br/>
    <form id="world" class="w-full">
        <div class="w-full" id="ea" v-for="(x, i) in inputs" :key="x.index">
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
                <button @click="Delete(i)" type="button" class="max-h-10 ms-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700">delete</button>
            </div>
            <br/>
        </div>
        <br/>
        <button @click="Post()" @touchend="Post()" type="button" class="max-h-10 ms-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700">Posting</button>
    </form>
</template>

<script setup>
    import {ref, onMounted} from "vue"
    import axios from 'axios'
    
    const props = defineProps([
        'contentid', 
        'api', 
        'datacontent'
    ])

    let i = 0
    const inputs = ref([
        {
            index: 0,
            input: `ini ke ${i}`,
            attribute: {
                element: '',
                tag: '',
                style: ''
            }
        }
    ])
    
    function getElement(tag){
        if(tag < 5){
            return "header"
        }else if(4 < tag < 7){
            return "text"
        }else{
            return "image"
        }
    }
    
    if(props.datacontent.length != 0){
        props.datacontent.map((res, index) => {
            inputs.value[index] = {
                index: index,
                input: res.content,
                attribute: {
                    element: getElement(res.tag),
                    tag: res.tag,
                    style: res.style
                }
            }
        })
    }

    async function addField(index){
        i++
        inputs.value.splice(index+1, 0, {
            index: index,
            input: `ini ke ${i}`,
            attribute: {
                element: '',
                tag: '',
                style: ''
            }
        })
    }

    async function Post(){
        for(var i=0; i < inputs.value.length; i++){
            console.log(props.api)
            console.log(props.contentid)
            await axios.get(props.api + '/api/getcontent/'+props.contentid+'/'+i).then(async (res) => {
                if(res.data == ''){
                    await axios.post(props.api+'/api/postcontent', {},{
                        params: {
                            i: i,
                            content_id: props.contentid,
                            content: inputs.value[i].input,
                            tag: inputs.value[i].attribute.tag == '' ? 5 : inputs.value[i].attribute.tag,
                            style: inputs.value[i].attribute.style
                        }
                    }).then( res => {
                        
                    })
                    
                }else{
                    await axios.put(props.api + '/api/updatecontent', {},{
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
            if(inputs.value.length < props.datacontent.length){
                await axios.delete(props.api + '/api/deletesubcontent',{
                    params: {
                        index: inputs.value.length - 1,
                        contentid: props.contentid,
                    }
                })
            }
        }
        window.location = '/creator/read/'+props.contentid
    }

    async function Delete(i){
        inputs.value.splice(i, 1)
    }

    onMounted( () => {
    })
</script>

<style>
    .container{
        position: absolute;
        width: 100%;
    }
</style>