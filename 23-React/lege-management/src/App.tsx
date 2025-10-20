import { RouterProvider } from 'react-router-dom';
import { router } from '@/router/index';
function App() {
	return (
		<>
			<div className='app'>
				<div className='text-red-500'>顶级组件app</div>
				<RouterProvider router={router} />
			</div>
		</>
	);
}

export default App;
