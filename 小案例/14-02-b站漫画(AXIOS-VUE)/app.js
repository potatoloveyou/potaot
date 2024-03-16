// https://apis.netstart.cn/bcomic/ClassPage?styleId=-1&areaId=-1&isFinish=-1&order=0&pageNum=1&pageSize=39&isFree=-1

// const labelValue = {
//   props: ['value'],
//   template: `<li>{{value.name}}</li>`,
// };

// Vue.component('label-item', {
//   props: ['label'],
//   template: `<ul><li>全部</li><li v-for="value in label">{{value.name}}</li></ul>`,
//   // template: `<ul><li>全部</li></ul>`,
//   // components: {
//   //   'label-value': labelValue,
//   // },
// });

var app = new Vue({
  el: '#app',

  data() {
    return {
      all: -1,
      labels: {}, //所有标签

      informations: {},
    };
  },

  computed: {
    parameter() {
      return {
        styleId: -1,
        areaId: -1,
        // isFinish=status 是否完结
        isFinish: -1,
        // order顺序  0人气推荐   1更新时间   3上架时间
        order: 0,
        pageNum: 1,
        pageSize: 39,
        // isFree=prices 是否免费  1免费  2付费  3等就免费
        isFree: -1,
      };
    },
  },

  // 方法
  methods: {
    getAllLabel() {
      axios.get('https://apis.netstart.cn/bcomic/AllLabel').then((res) => {
        // console.log(res.data.data);
        this.labels = res.data.data; // 获取所有标签数据并存储到label中
        console.log(this.labels);
      });
    },
    getAllImg() {
      axios
        .get('https://apis.netstart.cn/bcomic/ClassPage?', {
          params: this.parameter,
        })
        .then((res) => {
          // console.log(res.data.data);
          this.informations = res.data.data; // 获取所有图片数据并存储到informations中
        });
    },
    getId(labelName, labelValueId) {
      console.log(labelName, labelValueId);
      // 判断传进来的是哪个label和id
      switch (labelName) {
        case 'styles':
          this.parameter.styleId = labelValueId; 
          break;
        case 'areas':
          this.parameter.areaId = labelValueId;
          break;
        case 'status':
          this.parameter.isFinish = labelValueId;
          break;
        case 'orders':
          this.parameter.order = labelValueId;
          break;
        case 'prices':
          this.parameter.isFree = labelValueId;
          break;
        default:
          break;
      }
      // 重新发送ajax
      this.getAllImg();
    },
  },

  created() {
    // 组件创建时获取所有标签数据
    this.getAllLabel(); 
    // 组件创建时获取所有图片数据
    this.getAllImg(); 
  },
});
