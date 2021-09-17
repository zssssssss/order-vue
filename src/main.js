// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import FileSaver from 'file-saver'
import axios from 'axios';

import './assets/style/index.css'
import 'element-ui/lib/theme-chalk/index.css';

import {Message} from 'element-ui';
import {saveAs} from 'file-saver'

Vue.use(ElementUI)
Vue.prototype.$message = Message
Vue.prototype.$saveAs = saveAs
Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
