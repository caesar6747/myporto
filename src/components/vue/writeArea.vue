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
                <textarea v-if="x.attribute.element == 'text' || x.attribute.element == 'header'"v-model="x.input" name="input" class="w-11/12 block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
                <div v-if="x.attribute.element == 'image' && x.attribute.tag == '8'" class="flex items-center justify-center w-full">
                    <label for="dropzone-file" @click="triggerInput(i)" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <img :src="x.imagePreview ? x.imagePreview : x.input ? '/'+x.input : uploadIcon" width="50" height="20"/>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input :id="'file_input_'+i" type="file" class="hidden" @change="event => {
                            ArrangeImageIndex()
                            FileOnChange(i, event.target.files[0])
                        }"/>
                    </label>
                </div>
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

    const uploadIcon = ref('https://cdn3.iconfinder.com/data/icons/cloudcon-colored/512/upload-512.png')

    let i = 0
    const inputs = ref([
        {
            index: 0,
            input: `ini ke ${i}`,
            image: '',
            imagePreview: '',
            attribute: {
                element: '',
                tag: '',
                style: '',
                imageIndex: ''
            }
        }
    ])
    
    function getElement(tag){
        const tagNumber = Number(tag)
        if(tagNumber < 5){
            return "header"
        }else if(4 < tagNumber && tagNumber < 7){
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
                image: '',
                imagePreview: '',
                attribute: {
                    element: getElement(res.tag),
                    tag: res.tag,
                    style: res.style,
                    imageIndex: ''
                }
            }
        })
    }

    async function addField(index){
        i++
        inputs.value.splice(index+1, 0, {
            index: index,
            input: `ini ke ${i}`,
            image: '',
            imagePreview: '',
            attribute: {
                element: '',
                tag: '',
                style: '',
                imageIndex: ''
            }
        })
    }

    async function Post(){
        for(var i=0; i < inputs.value.length; i++){
            await axios.get(props.api + '/api/getcontent/'+props.contentid+'/'+i).then(async (res) => {
                if(res.data == ''){
                    if(inputs.value[i].attribute.tag == '8'){
                        await Upload(i)
                    }
                    await axios.post(props.api+'/api/postcontent', {},{
                        params: {
                            i: i,
                            content_id: props.contentid,
                            content: inputs.value[i].input,
                            tag: inputs.value[i].attribute.tag == '' ? 5 : inputs.value[i].attribute.tag,
                            style: inputs.value[i].attribute.style
                        }
                    })
                }else{
                    if(inputs.value[i].attribute.tag == '8'){
                        await Upload(i)
                    }
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

    async function Upload(index){
        if(inputs.value[index].image){
            const fd = new FormData()
            fd.append('image', inputs.value[index].image, inputs.value[index].image.name)
            await axios.post(props.api+'/api/upload-image', fd).then(res => {
                console.log(res)
            })
        }
    }

    function FileOnChange(index, file){
        inputs.value[index].image = file;
        inputs.value[index].input = file.name;
        const reader = new FileReader();
        reader.onload = e => {
            inputs.value[index].imagePreview = e.target.result;
        }
        reader.readAsDataURL(inputs.value[index].image);
    }

    function ArrangeImageIndex(){
        var imageIndex = 0
        inputs.value.map(item => {
            if(item.attribute.element == 'image'){
                item.attribute.imageIndex = imageIndex
                imageIndex++
            }else{
                item.attribute.imageIndex = ''
            }
        })
    }

    function triggerInput(index){
        const inp = document.getElementById('file_input_'+index)
        inp.click()
    }

    async function Delete(i){
        inputs.value.splice(i, 1)
    }

    onMounted( () => {
        //console.log(inputs)
    })
</script>

<style>
    .container{
        position: absolute;
        width: 100%;
    }
</style>