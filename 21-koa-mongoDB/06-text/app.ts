// const Koa = require('koa');
import Koa from 'koa';

// import Koa = require("koa");

const app = new Koa();

// response
app.use((ctx: any) => {
    ctx.body = 'Hello Koa';
});

app.listen(3000, () => {
    console.log("listen 3000 ok");
});