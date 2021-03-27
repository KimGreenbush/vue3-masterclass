import { createApp } from 'vue'
import App from './App.vue'

// extract app instance to a variable for isolation && customization before mounting (plugins, etc.)
const firstApp = createApp(App)

// CUSTOMIZATIONS 1

// global components:
// firstApp.component( name: "aButton", component: {})

//plugins:
// firstApp.use(aPlugin)

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