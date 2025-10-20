// router老写法
import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<div className='App'>
				<div className='text-red-500'>顶级组件app</div>
				<Link to='/home' className='link' style={{ padding: '10px', color: 'blue' }}>
					首页
				</Link>
				<Link to='/about' className='p-[10px] text-[blue]'>
					关于
				</Link>

				{/* 占位符，类似于vue的<router-view></router-view> */}
				<Outlet />
			</div>
		</>
	);
}

export default App;
