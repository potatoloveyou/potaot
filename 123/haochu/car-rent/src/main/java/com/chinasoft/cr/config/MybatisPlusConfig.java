package com.chinasoft.cr.config;

import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration // 下面是配置类
public class MybatisPlusConfig {
    @Bean   //  方法的返回值（对象）会被注入到spring 容器
    public MybatisPlusInterceptor getMybatisPlusInterceptor(){
        MybatisPlusInterceptor mpi = new MybatisPlusInterceptor();
        // 添加 分页拦截器
        mpi.addInnerInterceptor(new PaginationInnerInterceptor());
        return mpi;
    }
}
