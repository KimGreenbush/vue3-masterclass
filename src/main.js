import { createApp } from "vue"
import App from "./App.vue"
import router from "@/router" // direct import since file is named "index"
import store from "@/store" // direct import since file is named "index"
import firebaseConfig from "@/config/firebase"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
// initializeApp(firebaseConfig)
// Alt initialization for using anaylitics
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

// extract app instance to a variable for isolation && customization before mounting (plugins, etc.)
const firstApp = createApp(App)

// CUSTOMIZATIONS 1

// global components:
// firstApp.component("AppDate", AppDate)
// regex method to look in /components for App"Name" files
const requireComponent = require.context("./components", true, /App[A-Z]\w+\.(vue|js)$/)
requireComponent.keys().forEach(function(fileName) {
	let baseComponentConfig = requireComponent(fileName)
	baseComponentConfig = baseComponentConfig.default || baseComponentConfig
	const baseComponentName = baseComponentConfig.name || fileName.replace(/^.+\//, "").replace(/\.\w+$/, "")
	firstApp.component(baseComponentName, baseComponentConfig)
})

//plugins:
firstApp.use(router)
firstApp.use(store)

firstApp.mount("#app")

// other isolated app instance for customization
// const secondApp = createApp(App)

// CUSTOMIZATIONS 2

// global components:
// secondApp.component( name: "anotherButton", component: {})

//plugins:
// secondApp.use(anotherPlugin)

// other #id where to mount
// secondApp.mount('#second-app')
