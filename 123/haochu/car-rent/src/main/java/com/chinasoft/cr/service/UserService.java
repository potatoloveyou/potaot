package com.chinasoft.cr.service;



import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.chinasoft.cr.pojo.PageItem;
import com.chinasoft.cr.pojo.User;

import java.util.List;

public interface UserService {
    List<User> getUsers();

    Page<User> getUserPage(Integer pageNum, Integer pageSize);

    PageItem<User> getUserPage2(Integer pageNum, Integer pageSize,User query);

    Boolean deleteUser(Long userId);

    Boolean updateUser(User user);

    Boolean login(User user);
}
