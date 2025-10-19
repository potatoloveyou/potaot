// src/router/guard.ts
import type { Router, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
// import { useLoginStore } from '@/stores/login' // 根据你的实际路径调整

// 不需要登录的白名单 - 路由名称数组
const WHITE_LIST: string[] = [
  'login', 'register', 'forgot-password', 
  'home', 'about', 'contact', 'privacy'
]

export function setupRouterGuard(router: Router): void {
  // 全局前置守卫
  router.beforeEach((
    to: RouteLocationNormalized, 
    from: RouteLocationNormalized, 
    next: NavigationGuardNext
  ) => {
    // const loginStore = useLoginStore()
    
    // 在白名单中，直接放行
    if (to.name && WHITE_LIST.includes(to.name as string)) {
      next()
      return
    }
    
    // // 需要登录的页面
    // if (!loginStore.isUserLogin) {
    //   // 记录原始目标，登录后跳转回去
    //   next({
    //     name: 'login',
    //     query: { 
    //       redirect: to.fullPath,
    //       reason: 'auth_required'
    //     }
    //   })
    // } else {
    //   next()
    // }
  })
  
  // 全局后置守卫
  // router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  //   // 页面访问统计等
  //   console.log(`Navigated from ${from.path} to ${to.path}`)
    
  //   // 可以在这里添加页面追踪代码
  //   // analytics.trackPageView(to.path)
  // })
  
  // 可选：添加全局解析守卫
  // router.beforeResolve((
  //   to: RouteLocationNormalized, 
  //   from: RouteLocationNormalized, 
  //   next: NavigationGuardNext
  // ) => {
  //   // 在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后调用
  //   next()
  // })
  
  // 可选：添加错误处理
  // router.onError((error) => {
  //   console.error('路由错误:', error)
  //   // 可以跳转到错误页面
  //   // router.push('/error')
  // })
}

// 导出白名单常量，方便其他地方使用
export { WHITE_LIST }