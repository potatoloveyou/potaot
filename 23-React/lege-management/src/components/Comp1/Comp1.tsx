// 新版本可直接引入.scss文件
import './Comp1.scss';

import { FloatButton } from 'antd';
import { UpCircleOutlined, GiftOutlined } from '@ant-design/icons';
import { useState } from 'react';

// const Comp1 = () => {
// 	return ();
// };
// 以上写法可简写为(省略花括号)：
const Comp1 = () => {
	const [isTrue, setIsTrue] = useState(true);
	const handleClick = () => setIsTrue((isTrue) => !isTrue);
	<div className='box'>
		Comp1
		<FloatButton type='primary'>悬浮按钮</FloatButton>
		<UpCircleOutlined style={{ fontSize: '40rpx', color: 'blue' }} />
		<GiftOutlined style={{ color: 'green' }} />
		<div className={isTrue ? 'p-[10px] text-[blue]' : 'p-[10px] text-[red]'} onClick={handleClick}>
			测试
		</div>
	</div>;
};
export default Comp1;
