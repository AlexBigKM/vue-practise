import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/pages/Main.vue'
import PostsPage from '@/pages/PostsPage.vue'
import PostPage from '@/pages/PostPage.vue'
import About from '@/pages/About.vue'
import PostsPageWithStore from '@/pages/PostsPageWithStore.vue'
import PostsPageCompositionApi from '@/pages/PostsPageCompositionApi.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main
  },
  {
    path: '/posts',
    name: 'posts',
    component: PostsPage  
  },
  {
    path: '/posts/:id',
    name: 'post',
    component: PostPage  
  },
  {
    path: '/about',
    name: 'about',
    component: About  
  },
  {
    path: '/store',
    name: 'store',
    component: PostsPageWithStore  
  },
  {
    path: '/composition',
    name: 'composition',
    component: PostsPageCompositionApi  
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
