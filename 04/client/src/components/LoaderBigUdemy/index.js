import LogoNav from '../../images/logoNav.svg'
import { RaceBy } from '@uiball/loaders'
function LoaderBigUdemy({ loader }) {
  return loader ? (
    <div className="main-container-bigLoader-udemy">
      <img
      className="logo-bigLoader-udemy"
        src={LogoNav}
        alt="udemy-logo"
      />
      <RaceBy size={55} color="#231F20" />
    </div>
  ) : null;
}
export default LoaderBigUdemy;
