// contexts/LoadingContext.tsx
// 导入React及相关hooks，用于创建Context和状态管理
import React, { createContext, useContext, useState } from 'react';

/**
 * LoadingContext类型接口定义
 * isLoading: 表示当前是否处于加载状态
 * setLoading: 用于设置加载状态的函数
 */
interface LoadingContextType {
	isLoading: boolean;
	setLoading: (loading: boolean) => void;
}

// 创建LoadingContext，类型为LoadingContextType或undefined
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

/**
 * LoadingProvider组件
 * 用于提供全局的loading状态管理
 * @param children 子组件
 */
export function LoadingProvider({ children }: { children: React.ReactNode }) {
	// 使用useState创建加载状态
	const [isLoading, setIsLoading] = useState(false);

	// 设置加载状态的函数
	const setLoading = (loading: boolean) => {
		setIsLoading(loading);
	};

	// 通过Provider提供loading状态和设置函数给子组件
	return <LoadingContext.Provider value={{ isLoading, setLoading }}>{children}</LoadingContext.Provider>;
}

/**
 * 自定义Hook：useLoading
 * 用于在组件中访问loading状态
 * @throws 如果在Provider外使用会抛出错误
 * @returns LoadingContextType对象
 */
export function useLoading() {
	// 获取Context值
	const context = useContext(LoadingContext);
	// 检查是否在Provider内部使用
	if (context === undefined) {
		throw new Error('useLoading must be used within a LoadingProvider');
	}
	return context;
}
