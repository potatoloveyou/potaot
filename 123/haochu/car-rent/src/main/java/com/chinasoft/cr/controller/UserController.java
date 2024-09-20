package com.chinasoft.cr.controller;


import com.chinasoft.cr.pojo.PageItem;
import com.chinasoft.cr.pojo.Result;
import com.chinasoft.cr.pojo.User;
import com.chinasoft.cr.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin  //允许跨域
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/api/user/usersearch")
    public Result listAllUser(Integer pageNum, Integer pageSize, User query){
//        Page<User> page = userService.getUserPage(pageNum, pageSize);
        PageItem<User> pi = userService.getUserPage2(pageNum, pageSize,query);
        Result result = new Result(200, "查询成功", pi);
        return result;
    }

    @DeleteMapping("/api/user/{userId}")
    public Result deleteUser(@PathVariable Long userId){
        System.out.println("user id is " + userId);
        Boolean flag = userService.deleteUser(userId);

        if (flag == true) {
            Result result = new Result(200, "删除成功 ！", null);
            return result;
        } else {
            Result result = new Result(404, "删除failed ！", null);
            return result;
        }
    }

    @PutMapping("/api/user")
    public Result updateUser(@RequestBody User user) {
        System.out.println(user);
        Boolean flag = userService.updateUser(user);
        if (flag == true) {
            Result result = new Result(200, "修改成功 ！", null);
            return result;
        } else {
            Result result = new Result(404, "修改failed ！", null);
            return result;
        }
    }


    @PostMapping("/api/user/login")
    public Result login(@RequestBody User user) {
        System.out.println("------------------login-------------");
        System.out.println(user);
        Boolean flag = userService.login(user);
        if (flag == true) {
            Result result = new Result(200, "login 成功 ！", null);
            return result;
        } else {
            Result result = new Result(404, "login failed ！", null);
            return result;
        }
    }
}
