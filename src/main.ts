import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { Configuration as ApiConfiguration } from '@/assets/releaser-api/runtime';
import { DefaultApi as ReleaserApi } from '@/assets/releaser-api/apis';
import ReleasesModel from '@/models/Releases'

export let releaserApi = new ReleaserApi(new ApiConfiguration({
  basePath: 'http://localhost:3000'
}))
 
export let releasesModel = new ReleasesModel()

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
