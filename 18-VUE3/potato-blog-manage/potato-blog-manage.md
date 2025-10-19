api:
  - services                :API 请求服务模块
  - types                   :类型定义模块
  - index.ts                :统一导出所有 API 模块
  - request.ts              :axios二次封装（添加拦截器）
  - requestWithQueue.ts     :包装层,糅合请求队列模块和axios二次封装模块

utils:
  - RequestQueue.ts       :请求队列模块（用于管理并发请求）