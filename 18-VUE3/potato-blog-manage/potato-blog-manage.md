<!-- 此页面绝对不能自动格式化文档！！！ -->
api:
  - services                :API 请求服务模块
  - types                   :类型定义模块
  - index.ts                :统一导出所有 API 模块
  - request.ts              :axios二次封装（添加拦截器）
  - requestWithQueue.ts     :包装层,糅合请求队列模块和axios二次封装模块

stores:
  - theme.ts                :主题状态管理模块（用于管理应用主题）

utils:
  - RequestQueue.ts         :请求队列模块（用于管理并发请求）

router:
  - guard.ts                :全局路由守卫模块（用于处理路由跳转前的权限验证）

type:
  - index.ts                :统一导出所有类型定义模块
  - comment.ts              :评论类型定义模块
  - user.ts                 :用户类型定义模块

页面大致结构：
layout:                     :布局模块
  - DefaultLayout.vue       :头部、侧边、内容(路由出口)
    - AppHeader.vue         :头部
    - AppAside.vue          :侧边