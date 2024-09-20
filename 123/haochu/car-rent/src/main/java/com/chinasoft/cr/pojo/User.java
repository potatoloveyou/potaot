package com.chinasoft.cr.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;


@Data   // 让下面的类变成 java bean pojo 对象
public class User {
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    Long id;
    String username;
    String password;
    String nickName;
    String phone;
    String sex;
    String address;
    Integer role;
}
