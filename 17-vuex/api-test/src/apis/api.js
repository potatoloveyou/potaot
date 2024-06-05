import axios from 'axios';
// axios.defaults.baseURL = 'https://manga.bilibili.com';

export const getMangaList = () =>
	axios.post('/twirp/comic.v1.Comic/HomeRecommend?device=h5&platform=web', {
		seed: 1,
		drag: 1,
		page_num: 1,
		platform: 'h5',
	});

export const getMangaDetail = (id) =>
	axios.post('/twirp/comic.v1.Comic/ComicDetail?device=h5&platform=web&mobi_app=ios_webview_comic', {
		comic_id: id,
	});
