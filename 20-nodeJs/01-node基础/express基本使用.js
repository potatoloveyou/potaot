//1.引用express
const express =require('express');
//2.创建应用对象
const app=express();
//3.创建路由规则
//request是对请求报文的封装
//reponse是对响应报文的封装

/* //GET请求
app.get('/server',(request,response)=>{
	//设置响应头(设置允许跨域)
	response.setHeader('Access-Control-Allow-Origin','*');
	//设置响应
	response.send('Hello Express');
});

//POST请求
app.post('/server',(request,response)=>{
	//设置响应头(设置允许跨域)
	response.setHeader('Access-Control-Allow-Origin','*');
	//设置响应
	response.send('Hello Express');
});

//json
app.all('/json',(request,response)=>{
	//设置响应头(设置允许跨域)
	response.setHeader('Access-Control-Allow-Origin','*');
	//响应一个数据
	const data={
		name:'zhangsan',
		age:'31',
		num:'11'
	};
	//对对象进行字符串转换
	let str =JSON.stringify(data);
	//设置响应
	response.send(str);
});

//ie缓存
app.get('/ie',(request,response)=>{
	//设置响应头(设置允许跨域)
	response.setHeader('Access-Control-Allow-Origin','*');
	//设置响应
	response.send('Hello Express');
});

//请求超时
app.get('/delay',(request,response)=>{
	//设置响应头(设置允许跨域)
	response.setHeader('Access-Control-Allow-Origin','*');
	//延迟函数
	setTimeout(()=>{
		//设置响应
		response.send('延迟响应');
	},3000)
	
});

//jQuery服务
app.all('/jQuery',(request,response)=>{
	//设置响应头(设置允许跨域)
	response.setHeader('Access-Control-Allow-Origin','*');
	//自定义头信息要加这一条
	response.setHeader('Access-Control-Allow-Headers','*');
	const data={'name':'张三','age':'18'};
	response.send(JSON.stringify(data));
});

//axios服务
app.all('/axios',(request,response)=>{
	//设置响应头(设置允许跨域)
	response.setHeader('Access-Control-Allow-Origin','*');
	//自定义头信息要加这一条
	response.setHeader('Access-Control-Allow-Headers','*');
	const data={'name':'张三','age':'18'};
	response.send(JSON.stringify(data));
});

//fetch服务
app.all('/fetch',(request,response)=>{
	//设置响应头(设置允许跨域)
	response.setHeader('Access-Control-Allow-Origin','*');
	//自定义头信息要加这一条
	response.setHeader('Access-Control-Allow-Headers','*');
	const data={'name':'张三','age':'18'};
	response.send(JSON.stringify(data));
});

//用户名检测是否存在
app.all('/check_username',(request,response)=>{
	// if(request.)
	const data={
		exist:1,
		msg:'用户名已经存在'
	};
	let str=JSON.stringify(data);
	response.send(`handle(${str})`);
});

//jQuery发送jsonp请求
app.all('/jQuery_jsonp',(request,response)=>{
	const data={
		name:'zhangsan',
		age:'18'
	};
	let str=JSON.stringify(data);
	//接收callback参数
	let cb=request.query.callback;
	console.log(cb);
	response.send(`${cb}(${str})`);
}); */
/* app.all('/Android',(request,response)=>{
	//设置响应头(设置允许跨域)
	response.setHeader('Access-Control-Allow-Origin','*');
	//响应一个数据
	const data={
		name:'zhangsan',
		age:'31',
		num:'11'
	};
	//对对象进行字符串转换
	let str =JSON.stringify(data);
	//设置响应
	response.send(str);
});
*/


// app.all('/student',(request,response)=>{
// 	//设置响应头(设置允许跨域)
// 	// response.setHeader('Access-Control-Allow-Origin','*');
// 	//响应一个数据
// 	const data=[
// 		{'id':'001','name':'zhangsan','age':'31'},
// 		{'id':'002','name':'jerry','age':'22'},
// 		{'id':'003','name':'tony','age':'30'}
// 	];
// 	//对对象进行字符串转换
// 	let str =JSON.stringify(data);
// 	//设置响应
// 	response.send(str);
// 	console.log('响应请求')
// });
// app.all('/medal',(request,response)=>{
// 	//设置响应头(设置允许跨域)
// 	// response.setHeader('Access-Control-Allow-Origin','*');
// 	//响应一个数据
// 	const data=[
// 		{'id':'001','name':'中国','num':'31'},
// 		{'id':'002','name':'小日子','num':'22'},
// 		{'id':'003','name':'韩国','num':'30'}
// 	];
// 	//对对象进行字符串转换
// 	let str =JSON.stringify(data);
// 	//设置响应
// 	response.send(str);
// 	console.log('响应请求')
// });

//jQuery服务
app.post('/sign_in',(request,response)=>{
	// console.log(request)
	//设置响应头(设置允许跨域)
	response.setHeader('Access-Control-Allow-Origin','*');
	//自定义头信息
	response.setHeader('Access-Control-Allow-Headers','*');
	const data={'status':0,'message':'登录成功',"token":"123456"};
	response.send(JSON.stringify(data));
});

app.post('/sign_up',(request,response)=>{
	// console.log(request)
	//设置响应头(设置允许跨域)
	response.setHeader('Access-Control-Allow-Origin','*');
	//自定义头信息
	response.setHeader('Access-Control-Allow-Headers','*');
	const data={'status':0,'message':'注册成功'};
	response.send(JSON.stringify(data));
});

app.all('/hello',(request,response)=>{
	// console.log(request)
	//设置响应头(设置允许跨域)
	response.setHeader('Access-Control-Allow-Origin','*');
	//自定义头信息
	response.setHeader('Access-Control-Allow-Headers','*');
	const data={'status':0,'message':'hello browser'};
	response.send(JSON.stringify(data));
});

app.all('/test3',(request,response)=>{
	//设置响应头(设置允许跨域)
	response.setHeader('Access-Control-Allow-Origin','*');
	//响应一个数据
	const data={
		code:200,
		data:{
			companyVO:{
				address:'http://www.baidu.com',
				name:'百度',
				amount:10
			},
			senderReceiptList:undefined,
			accepterReceiptList:undefined
		}
	};
	//对对象进行字符串转换
	let str =JSON.stringify(data);
	//设置响应
	response.send(str);
	console.log('用户点击了查询，响应请求')
});

//4.监听端口启动服务
app.listen(8001,()=>{
	console.log("服务已经启动，8001端口监听中");
}) 