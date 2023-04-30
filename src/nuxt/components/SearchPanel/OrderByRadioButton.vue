<template>
    <div class="w-full flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
        <input 
            type="radio" 
            @click="$emit('setSelectedOrderBy', $event)"
            :id="id"
            name="order-by" 
            :value="value"
            :checked="checked"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
        />
        <label :for="id" class="w-full py-4 ml-2 text-sm font-medium text-gray-900">{{message}}</label>
    </div>
</template>

<script setup>

    const props = defineProps({
        id: String,
        message: String,
        value: String,
        checked: Boolean
    })

</script>