package com.chinasoft.cr.service.impl;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.chinasoft.cr.mapper.UserMapper;
import com.chinasoft.cr.pojo.PageItem;
import com.chinasoft.cr.pojo.User;
import com.chinasoft.cr.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserServicelmpl implements UserService {
    @Autowired
    UserMapper userMapper;
    private Long userId;


    @Override
    public List<User> getUsers() {
        List<User> userList = userMapper.selectList(null);
        return userList;
    }

    @Override
    public Page<User> getUserPage(Integer pageNum, Integer pageSize) {
//        进行分页操作
//        创建分页对象
        Page<User> page = new Page<>(pageNum, pageSize);
//        进行分页查询
        userMapper.selectPage(page, null);
//        分页的结果在page里面
        List<User> userList = page.getRecords();
        userList.forEach(user -> System.out.println(user));
        System.out.println("总页数：" + page.getPages());
        return page;
    }

    @Override
    public PageItem<User> getUserPage2(Integer pageNum, Integer pageSize,User query) {
        //        进行分页操作
        //        创建分页对象
        Page<User> page = new Page<>(pageNum, pageSize);
        //        创建一个查询条件对象
        LambdaQueryWrapper<User> lqw = new LambdaQueryWrapper<>();
        // 对 id 进行模糊查询
//        if (query.getId() != null) {
//            lqw.like(User::getId, query.getId());
//        }
        lqw.like(query.getId() != null,
                User::getId, query.getId());
        lqw.like(query.getUsername() != null,
                User::getUsername, query.getUsername());
        lqw.like(query.getPhone() != null,
                User::getPhone, query.getPhone());
        lqw.like(query.getAddress() != null,
                User::getAddress, query.getAddress());
        // 进行分页查询
        userMapper.selectPage(page, lqw);
        // 分页的结果在page里面
        List<User> userList = page.getRecords();
        userList.forEach(user -> System.out.println(user));
        System.out.println(page.getTotal());
        PageItem<User> pi = new PageItem<>(userList, page.getTotal());
        return pi;
    }

    @Override
    public Boolean deleteUser(Long userId) {
        //  进行查询
        User user = userMapper.selectById(userId);
        if (user == null) {
            return false;
        }
        //  用户存在
        int ret = userMapper.deleteById(userId);
        if (ret == 1) {
            // 删除成功
            return true;
        } else {
            // 删除失败
            return false;
        }
    }



    @Override
    public Boolean updateUser(User user) {
        int ret = userMapper.updateById(user);
        if (ret == 1) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Boolean login(User user) {
        LambdaQueryWrapper<User> lqw = new LambdaQueryWrapper<>();

        lqw.eq(User::getUsername, user.getUsername());
        lqw.eq(User::getPassword, user.getPassword());
        User userDb = userMapper.selectOne(lqw);
        if (userDb != null) {
            return true;
        }
        return false;
    }


}
