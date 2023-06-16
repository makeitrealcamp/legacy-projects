import { ClientNavbar } from './ClientNavBar';
import styles from '../styles/ClientLayout.module.scss';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <div className={styles.clientLayout}>
      <ClientNavbar />
      <section className={styles.sectionClientLayout}>{children}</section>
    </div>
  );
}
