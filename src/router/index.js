import Vue from 'vue'
import Router from 'vue-router'
import Start from '@/components/Start.vue'
import Guide from '@/components/Guide.vue'
import Login from '@/components/Login.vue'
import Help from '@/components/Help.vue'
import Home from '@/components/Home.vue'
import Map from '@/components/child/Map.vue'
import Monitor from '@/components/child/Monitor.vue'
import Setting from '@/components/child/Setting.vue'
import Newpwd from '@/components/child/children/Newpwd.vue'
import Details from '@/components/child/children/Details.vue'
import Device from '@/components/child/children/Device.vue'
import Rta from '@/components/child/children/Rta.vue'
import Rtas from '@/components/child/children/Rtas.vue'
import History from '@/components/child/children/History.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Start',
      component: Start,
    },
    {
      path:'/Guide',
      name:'Guide',
      component:Guide,
    },    
    {
      path:'/Login',
      name:'Login',
      component:Login,
    },{
      path:'/Help',
      name:'Help',
      component:Help,
    },
    {
      path:'/Home',
      name:'Home',
      component:Home,
      children:[
      {
        path:'/Home',
        redirect:'/Map' 
      },
      	{
      		path:'/Map',
      		name:'Map',
      		component:Map,
      	},
      	{
      		path:'/Monitor',
      		name:'Monitor',
      		component:Monitor,
      	},{
      		path:'/Setting',
      		name:'Setting',
      		component:Setting,
      	},
        {
          path:'/Map/Details',
          name:'Details',
          component:Details,
        }  
      ]
    },
    {
      path:'/Newpwd',
      name:'Newpwd',
      component:Newpwd,
    },
    {
      path:'/Device',
      name:'Device',
      component:Device,
    },{
      path:'/Device/Rta',
      name:'Rta',
      component:Rta,
      children:[
        {
          path:'Rtas',
          name:'Rtas',
          component:Rtas,
        },
      ]
    },
    {
      path:'/History',
      name:'History',
      component:History,
    },
  ]
})
