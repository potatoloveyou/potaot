package com.chinasoft.cr;

import com.chinasoft.cr.mapper.UserMapper;
import com.chinasoft.cr.pojo.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class UserServicelmplTest {

    @Autowired
    UserMapper userMapper;

    @Test
    void contextLoads() {
        User user = userMapper.selectById(13L);
        System.out.println(user);
    }

    @Test
    void testSelectAll(){
        List<User> userList = userMapper.selectList(null);
        userList.forEach(user -> System.out.println(user));
    }

    @Test
    void testInsert() throws Exception{
        User user = userMapper.selectById(13L);
        user.setId(null);
        user.setUsername("test");

        for (int i = 0; i < 100; i++) {
            user.setId(null);
            userMapper.insert(user);
        }
    }



}
