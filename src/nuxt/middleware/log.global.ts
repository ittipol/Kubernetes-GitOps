import { useAuthStore } from "~/stores/auth";

// export default defineNuxtRouteMiddleware(to => {
//     console.log(to)
//     // skip middleware on server
//     if (process.server) return
//     // skip middleware on client side entirely
//     if (process.client) return
//     // or only skip middleware on initial client load
//     const nuxtApp = useNuxtApp()
//     if (process.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) return
//   })

export default defineNuxtRouteMiddleware((to, from) => {
    // const { isLoggedIn } = useAuth() //composable
  
    // console.log(isLoggedIn()); // <- Screenshot
    // // `from.name === login` will trigger rediraction for example if user want to login but he is already logged in.
    // // form.name will be necesery if you use suffix `.global` in file name.
    // if (isLoggedIn() && to.params.id && !from.params.id && from.name === `login`) {
    //   return navigateTo(`/albums/${to.params.id}/edit`)
    // }
    // if (!isLoggedIn() && form.params.id) {
    //   return abortNavigation()
    // }

    // skip middleware on server
    if (process.server) return

    // console.log('[Middleware]')

    // console.log("process. server: "+ process.server)
    // console.log("process. client: "+ process.client)

    // console.log('To: ',to)
    // console.log('From: ', from)
})