<template>
  <div class="hello">
    <!-- file文件上传  multiple允许多文件上传(一般不用)  -->
    <input type="file" name="file" @change="fileChange" multiple />
    <div>{{ percentage }}%</div>
    <ul>
      <li v-for="(file, index) in imgList" :key="index">{{ file.name }}</li>
    </ul>
    <button @click="submit">提交</button>
    <img style="width: 500px" :src="imgBase64" alt="" />
  </div>
</template>

<script>
// import axios from 'axios';
const axios = require('axios');
let fileObj;
export default {
  name: 'HelloWorld',

  props: {},

  data() {
    return {
      imgBase64: '',
      imgList: [],
      // 百分比
      percentage: 0,
    };
  },

  methods: {
    // 上传时
    fileChange(event) {
      // 单文件上传

      // let file = event.target.files[0];
      // fileObj = file;
      // // 判断文件  大小
      // if (file.size > 10 * 1024 * 1024) {
      //   alert('文件大小不能超过10M');
      // }
      // // 判断文件  类型
      // if (file.type !== 'application/pdf') {
      //   alert('只允许上传pdf文件');
      // }

      // // 将文件转成blob，再进行  切片
      // // 只是演示，file和blob对象可以互转(正常来说很少用blob，因为blob不支持读取)
      // let sliceBlob = new Blob([file]).slice(0, 50000);
      // let sliceFile = new File([sliceBlob], 'sliceFile.pdf');

      // // fileReader用于将blob或者file转换成base64
      // let fileReader = new FileReader();
      // fileReader.readAsDataURL(sliceFile);
      // // // 转化为文本格式
      // // fileReader.readAsText(sliceFile);

      // // readAsDataURL是异步操作，需要监听onload事件才能获取到结果    (制作缩略图 )
      // fileReader.onload = (event) => {
      //   console.log(event.target.result);
      //   // 将base64赋值给imgBase64，用于展示被切割后的图片
      //   this.imgBase64 = event.target.result;
      // };

      // 多文件上传
      // // 法1.这种是在input添加了multiple属性后，按住ctrl多选文件
      // let fileList = event.target.files;
      // console.log(fileList);

      // // 法2.这种是类似于多次单文件上传的多文件上传
      // // this.imgList.push(event.target.files[0]);
      // if (event.target.files.length > 1) {
      //   this.imgList.push(...event.target.files);
      // } else {
      //   this.imgList.push(event.target.files[0]);
      // }
      // console.log(this.imgList);

      // 大文件切片上传
      fileObj = event.target.files[0];
      // let chunkSize = 1 * 1024 * 1024; // 1M
      // let chunks = Math.ceil(file.size / chunkSize);
      // let currentChunk = 0;
    },

    // 提交时
    async submit() {
      // 单文件上传
      // let formData = new FormData();
      // // 可以添加很多信息，这些后端都可以读到
      // // 这里接收资料后传递给后端是将文件转化为二进制
      // formData.append('file', fileObj);
      // formData.append('user', 'test');
      // axios.post('/xxx', formData);

      // 多文件上传
      // this.imgList.forEach((file) => {
      //   let formData = new FormData();
      //   formData.append(file.name + 'file', file);
      //   axios.post('/xxx', formData);
      // });

      // 大文件切片上传
      // chunkSize  块大小
      let chunkSize = 2 * 1024 * 1024; // 2M
      // 总大小
      let fileSize = fileObj.size;
      // 当前已经传递的大小
      let currentSize = 0;

      // 断点续传
      // 这里需要后端配合，后端需要返回一个状态，告诉前端已经传了多少
      // 前端可以将currentSize存在本地，例如:
      localStorage.setItem(fileObj.name, currentSize);

      while (currentSize < fileSize) {
        let formData = new FormData();
        formData.append(fileObj.name, fileObj.slice(currentSize, currentSize + chunkSize));

        await axios
          .get('https://www.baidu.com')
          .then(() => {
            // slice(开始大小，结束大小)
            fileObj.slice(currentSize, currentSize + chunkSize);
          })
          .catch(() => {});

        // 当前百分比(有可能会超过100%)
        this.percentage = Math.min((currentSize / fileSize) * 100, 100);

        // 更改当前已经传递的大小
        currentSize += chunkSize;
      }
    },
  },
};
</script>

<style scoped lang="less"></style>
