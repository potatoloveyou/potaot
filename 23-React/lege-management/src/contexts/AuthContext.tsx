// contexts/AuthContext.tsx
// 导入React相关依赖
import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * 用户信息接口定义
 * @interface User
 */
interface User {
	id: string;      // 用户唯一标识
	name: string;    // 用户姓名
	email: string;   // 用户邮箱
	role: string;    // 用户角色
}

/**
 * 认证上下文类型定义
 * @interface AuthContextType
 */
interface AuthContextType {
	user: User | null;           // 当前用户信息
	login: (token: string, userData: User) => void;  // 登录方法
	logout: () => void;          // 登出方法
	isAuthenticated: boolean;    // 认证状态
}

// 创建认证上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * 认证提供者组件
 * @function AuthProvider
 * @param {React.ReactNode} children - 子组件
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
	// 用户状态管理
	const [user, setUser] = useState<User | null>(null);

	// 组件挂载时执行，检查本地存储的认证状态
	useEffect(() => {
		// 从本地存储获取认证信息
		const token = localStorage.getItem('authToken');
		const userData = localStorage.getItem('userData');

		// 如果存在认证信息，则设置用户状态
		if (token && userData) {
			setUser(JSON.parse(userData));
		}
	}, []); // 空依赖数组表示只在组件挂载时执行一次

	/**
	 * 登录处理函数
	 * @function login
	 * @param {string} token - 认证令牌
	 * @param {User} userData - 用户数据
	 */
	const login = (token: string, userData: User) => {
		// 将认证信息存储到本地
		localStorage.setItem('authToken', token);
		localStorage.setItem('userData', JSON.stringify(userData));
		// 更新用户状态
		setUser(userData);
	};

	/**
	 * 登出处理函数
	 * @function logout
	 */
	const logout = () => {
		// 清除本地存储的认证信息
		localStorage.removeItem('authToken');
		localStorage.removeItem('userData');
		// 重置用户状态
		setUser(null);
	};

	// 构建上下文值对象
	const value = {
		user,                    // 当前用户信息
		login,                   // 登录方法
		logout,                  // 登出方法
		isAuthenticated: !!user, // 根据用户是否存在判断认证状态
	};

	// 返回上下文提供者组件
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * 自定义Hook：使用认证上下文
 * @function useAuth
 * @returns {AuthContextType} 认证上下文
 * @throws {Error} 当在AuthProvider外部使用时抛出错误
 */
export function useAuth() {
	// 获取认证上下文
	const context = useContext(AuthContext);
	// 检查上下文是否存在
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
