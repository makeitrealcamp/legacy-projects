import '../assets/styles/pages/HomePage.scss';
import { TutorsContainer } from '../components/TutorsContainer';

function HomePage() {
  return (
    <main className="homepage-container">
      <div className="homepage-content">
        <TutorsContainer title="Find a tutorship" />
      </div>
    </main>
  );
}

export default HomePage;
