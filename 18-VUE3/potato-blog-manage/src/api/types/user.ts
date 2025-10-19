// 登录接口参数
export interface LoginParams {
	username: string;
	password: string;
}

// 登录接口返回值
export interface LoginResponse<T> {
	token: string;
	userInfo: T;
}
// export interface LoginResponse {
//   token: string
//   userInfo: {
//     id: string
//     username: string
//     avatar: string
//   }
// }
