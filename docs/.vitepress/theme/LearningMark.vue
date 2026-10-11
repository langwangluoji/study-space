<script setup>
import {ref,onMounted} from 'vue';
import {useRoute} from 'vitepress';
const props=defineProps({section:String});const route=useRoute();
const completed=ref(false),mastery=ref(false);
const key=()=>`${route.path.split('/').pop().replace('.html','')}:${props.section}`;
const has=(record,k)=>Object.prototype.hasOwnProperty.call(record,k);
const read=k=>{try{const value=JSON.parse(localStorage.getItem(k)||'{}');return value&&typeof value==='object'&&!Array.isArray(value)?value:{}}catch{return {}}};
onMounted(()=>{const p=read('ml-course-progress-v1');completed.value=has(p,props.section)?!!p[props.section]:has(p,key())?!!p[key()]:props.section==='p15'&&!!p.practice;mastery.value=!!read('ml-course-mastery-v1')[key()]});
function save(){try{const p=read('ml-course-progress-v1');p[props.section]=completed.value;if(has(p,key()))p[key()]=completed.value;if(props.section==='p15')p.practice=completed.value;localStorage.setItem('ml-course-progress-v1',JSON.stringify(p));const m=read('ml-course-mastery-v1');m[key()]=mastery.value;localStorage.setItem('ml-course-mastery-v1',JSON.stringify(m));}catch{}}
</script>
<template><div class="learning-mark"><label><input type="checkbox" v-model="completed" @change="save"> 已读 {{section.toUpperCase()}}</label><label><input type="checkbox" v-model="mastery" @change="save"> 本节已掌握</label></div></template>
