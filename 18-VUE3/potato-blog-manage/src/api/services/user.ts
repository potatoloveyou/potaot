// import request from '@/api/request';
import { queuedRequest } from '@/api/requestWithQueue';
import type { LoginParams, LoginResponse } from '@/api/types/user';

/**
 * 用户登录
 */
export const login = <T>(data: LoginParams) => {
  return queuedRequest.post<LoginResponse<T>>('/user/login', data);
}