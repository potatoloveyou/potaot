import axios from 'axios';
axios.defaults.baseURL = 'https://apis.netstart.cn/music';


export const getPersonalizeds = () =>
  axios.get('/personalized', {
    params: {
      limit: 6,
    },
  });

export const getNewsongs = () =>
  axios.get('/personalized/newsong', {
    params: {
      limit: 10,
    },
  });

export const getSearchHots = () => axios.get('/search/hot');

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
export const getSelectResult = (keywords, selectedResultsLength) =>
  axios.get('/search', {
    params: {
      keywords,
      limit: 20,
      offset: selectedResultsLength,
    },
  });
