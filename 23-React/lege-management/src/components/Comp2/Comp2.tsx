// 老版本则需要模块化引入.module.scss文件
import styles from './Comp2.module.scss';

export default function Comp2() {
	return (
		// 老版本需要通过{styles.}类名的方式引入类名
		<div className={styles.box}>Comp2</div>
	);
}
