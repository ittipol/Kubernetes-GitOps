<template>

    <div class="w-[400px] mx-auto">
        <dl class="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 p-8">
            <div class="flex flex-col pb-3">
                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Name</dt>
                <dd class="text-lg font-semibold">{{store.name}}</dd>
            </div>
        </dl>
    </div>

</template>

<script setup>
    import { useAuthStore } from "../stores/auth";
    
    definePageMeta({
        middleware: ["auth"]
    });

    const store = useAuthStore()


</script>