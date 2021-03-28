import { createApp } from 'vue'
import App from './App.vue'
import PageHome from "@/components/PageHome"
import PageThreadShow from "@/components/PageThreadShow"
import { createRouter, createWebHistory } from "vue-router"

const routes = [
    {   path: "/",
        name: "Home",
        component: PageHome
    },
    {   path: "/thread/:id",
        name: "ThreadShow",
        component: PageThreadShow,
        props: true
    }
]

const router = createRouter({
	history: createWebHistory(),
	routes,
});

// extract app instance to a variable for isolation && customization before mounting (plugins, etc.)
const firstApp = createApp(App)

// CUSTOMIZATIONS 1

// global components:
// firstApp.component( name: "aButton", component: {})

//plugins:
firstApp.use(router)

firstApp.mount('#app')

// other isolated app instance for customization
// const secondApp = createApp(App)

// CUSTOMIZATIONS 2

// global components:
// secondApp.component( name: "anotherButton", component: {})

//plugins:
// secondApp.use(anotherPlugin)

                         // other #id where to mount
// secondApp.mount('#second-app')