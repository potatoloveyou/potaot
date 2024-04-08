import axios from 'axios';

export const getPersonalizeds = () =>
  axios.get('https://apis.netstart.cn/music/personalized', {
    params: {
      limit: 6,
    },
  });

export const getNewsongs = () =>
  axios.get('https://apis.netstart.cn/music/personalized/newsong', {
    params: {
      limit: 10,
    },
  });

export const getSearchHots = () => axios.get('https://apis.netstart.cn/music/search/hot');

// export const getKeywords = (keywords) =>
// getSearchSuggestions 搜索建议
export const getSearchSuggestions = (keywords) =>
  axios.get('https://apis.netstart.cn/music/search/suggest', {
    params: {
      keywords,
      type: 'mobile',
    },
  });

// getSelectResult 选择搜索结果
export const getSelectResult = (keywords) =>
  axios.get('https://apis.netstart.cn/music/search', {
    params: {
      keywords,
      limit: 20,

    },
  });
