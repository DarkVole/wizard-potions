import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import AddPotion from '@/components/AddPotion'
import EditPotion from '@/components/EditPotion'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
    },
        {
            path: '/add-potion',
            name: 'AddPotion',
            component: AddPotion
      },
        {
            path: '/edit-potion/:potion_slug',
            name: 'EditPotion',
            component: EditPotion
      }
  ]
})
