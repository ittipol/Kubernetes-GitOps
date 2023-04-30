<template>
    <div>
      <Header />
      <div class="pb-[200px]">
        <slot />
      </div>      
      <Footer />
    </div>
</template>
  
<script setup lang="ts">    
    // const nuxtApp = useNuxtApp()
    // console.log(nuxtApp)
    // const {$name} = nuxtApp // from plug-in

    // console.log($name)
    // console.log(nuxtApp.isHydrating)

  </script>