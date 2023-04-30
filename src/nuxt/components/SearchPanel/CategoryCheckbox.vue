<template>
    <div>
        <input 
            type="checkbox"
            @click="$emit('setSelectedCategory', $event)"
            :id="'check-box-category-'+id"
            :value="id"
            :checked="checked"
        >

        <label class="ml-2 text-sm" :for="'check-box-category-'+id">{{ name }}</label>
    </div>
</template>

<script setup>

    const props = defineProps({
        name: String,
        id: Number,
        checked: Boolean
    })
 
</script>