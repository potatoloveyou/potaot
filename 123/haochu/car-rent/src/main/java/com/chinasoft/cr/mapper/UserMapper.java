package com.chinasoft.cr.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;


import com.chinasoft.cr.pojo.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper extends BaseMapper<User> {
}
