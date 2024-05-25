import axios from 'axios';
axios.defaults.baseURL = 'https://apis.netstart.cn/music';

export const getRecommendationList = () =>
  axios.get('/personalized', {
    params: {
      limit: 6,
    },
  });

export const getNewSongList = () =>
  axios.get('/personalized/newsong', {
    params: {
      limit: 10,
    },
  });

export const getSearchHotList = () => axios.get('/search/hot');

// export const getKeywords = (keywords) =>
// getSearchSuggestions 搜索建议
export const getSearchSuggestions = (keywords) =>
  axios.get('/search/suggest', {
    params: {
      keywords,
      type: 'mobile',
    },
  });

// getSelectResult 选择搜索结果
export const getSelectResult = (keywords, offset) =>
  axios.get('/search', {
    params: {
      keywords,
      limit: 20,
      offset,
    },
  });

// getPlayList 获取歌曲详情
export const getPlayList = (id) =>
  axios.get('/playlist/detail', {
    params: {
      id,
    },
  });
