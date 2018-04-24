import Vue from 'vue'
import Router from 'vue-router'
import Weather from '@/components/Weather'
import History from '@/components/History'
import Express from '@/components/Express'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Weather',
      component: Weather
    },
    {
      path: '/History',
      component: History
    },
    {
      path: '/Express',
      component: Express
    },
    {
      path: '/*',
      redirect: '/Weather'
    }
  ]
})
