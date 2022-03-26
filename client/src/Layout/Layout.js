import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <main className={styles.layout}>
      <Outlet />
    </main>
  );
}

export default Layout;
