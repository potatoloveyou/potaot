import { useState } from 'react';

function Test1() {
	const [count, setCount] = useState(0);

	return (
		<>
			<div className='text-red-500'>测试组件1</div>
		</>
	);
}

export default Test1;
