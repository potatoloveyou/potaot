package com.chinasoft.cr.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Result {
    Integer status; //状态码
    String message; //信息
    Object data; //数据
}
