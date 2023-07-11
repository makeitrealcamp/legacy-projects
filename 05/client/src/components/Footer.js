import '../styles/components/Footer.scss'
import circle from '../styles/icons/c-circle.svg'
import globe from '../styles/icons/globe.svg'
import chevron from '../styles/icons/chevron-up.svg'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer_w1">
                <img src={circle} alt="logo"/>
                    <span>2022 Airbnb, Inc</span>
                    <span>·</span>
                    <button>Privacidad</button>
                    <span>·</span>
                    <button>Terminos</button>
                    <span>·</span>
                    <button>Mapa del sitio</button>
                    <span>·</span>
                    <button>Datos de la empresa</button>
            </div>
            <div className="footer_w2">
                <img src={globe} alt="logo"/>
                    <button>Espanol (CO)</button>
                    <button>$COP</button>
                    <button className="footer_w2_asistencia">
                        <span>Asistencia y recursos</span>
                        <img src={chevron} alt="logo"/>
                    </button>
            </div>
        </footer>
    )
}

export default Footer;