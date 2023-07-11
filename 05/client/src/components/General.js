import { Modal } from "@mantine/core";
import { useState } from "react";
import "../styles/components/general.scss";
import AirCoverModal from "./AirCoverModal";
import Amenities from "./Amenities";
import DescriptionModal from "./DescriptionModal";
import GeneralBeds from "./GeneralBeds";
import RentCalendar from "./RentCalendar";
const General = (props) => {
  const [openShowMore, setOpenShowMore] = useState(false);
  const [opened, setOpened] = useState(false);
  let textDesc = "";
  if (props.randomNumber === 1) {
    textDesc = {
      text1: `Hemos creado un espacio unico que te permitira vivir una
      experiencia única de inmersión en la naturaleza con excelente
      acceso vía asfaltada. armonía. Es una construcción única, una
      solución sustentable en armonía con la naturaleza. . Disfrutaras
      de conectividad excelente, 200 Megas de Velocidad vía fibra
      óptica. Es un espacio innovador que te invitara a descubrir el
      concepto de confort escencial de nuestra Tiny House con un paisaje
      inolvidable sobre la Cordillera de los Andes Colombianos...`,
      text2: `Ideal para aventureros, y personas con intencion de vivir de una experiencia única.`,
      text3: `Alquilaste toda la casa para ti. Se proporcionará un código único un día antes de la fecha de llegada.`,
    };
  } else if (props.randomNumber === 2) {
    textDesc = {
      text1: `¿Alguna vez te has alojado en un unicornio gigante de conchas marinas? No, no lo has hecho, pero ahora puedes tacharlo de tu lista de deseos. Esta mágica obra de arte forma parte de Willy Wonka, que forma parte de Big Lebowski, y no se parece en ningún otro lugar. Hazlo por el gramo, pero también por tu alma.`,
      text2: `Venga a tomarse unas vacaciones del mundo real de los ángulos rectos y las cajas pegajosas. Situado en un lote aislado y maravillosamente restaurado, The Bloomhouse es una celebración de todas las cosas mágicas y místicas.`,
      text3: `Alquilaste toda la casa para ti. Se proporcionará un código único un día antes de la fecha de llegada.`,
    };
  } else if (props.randomNumber === 3) {
    textDesc = {
      text1: `Este tipo de construcción está es indicada para viajeros que gustan de la aventura exótica. No posee aire acondicionado, pocas paredes y con wify rápido pero sin televisión. tiene unos cuatro pisos de altura, una de las vistas panorámicas más increíbles del mundo (algunos días pueden verse las montañas y parece estar en un lago Suizo)y se llega después de remar unos quince metros en dinghy y hay que subir a los pisos superiores en un pequeño elevador.Si usted ama el arte y aventura es ideal.`,
      text2: `Todas mis creaciones arquitectónicas comienzan con un modelo en escala y en tres dimensiones de mi propia creación. Eventualmente uso artesanos locales para su construcción. La torre se encuentra ubicada sobre un fondo marino, de aguas transparentes poblada de una fauna marina variopinta que incluye desde barracudas hasta mantarrayas de diferentes tamaños y colores más miles de escuelas de peces en diferentes tamaños y etapas de crecimiento.`,
      text3: `Alquilaste toda la casa para ti. Se proporcionará un código único un día antes de la fecha de llegada.`,
    };
  } else if (props.randomNumber === 4) {
    textDesc = {
      text1: `Un espacio pensado para parejas. Todas las comodidades de ciudad en el medio de las montañas Caleñas. Al lado del Parque Nacional Natural Los Farallones de Cali, despertarás todas las mañanas con la energía del sol sobre tu cabeza.`,
      text2: `Una arquitectura sin igual para descansar en pareja.`,
      text3: `Nuestros huéspedes tendrán acceso a los senderos de la propiedad en donde encontrarán una gran variedad de fauna y flora típica del Parque Natural Nacional Los Farallones de Cali`,
    };
  } else {
    textDesc = {
      text1: `Esta casa, una de las cuatro de este diseño único, ofrece comodidades premium con lo mejor de Puerto Escondido a la vuelta de la esquina. Situado en la moderna La Punta, está a 5 minutos a pie de la playa, los restaurantes, los bares y los cafés.`,
      text2: `Diseñado por el renombrado arquitecto francés Ludwig Godefroy (ludwiggodefroy.com) en estilo "brutalista", la casa ofrece una experiencia de vida interior/exterior única, con jardines y piscina privada integrada en las áreas de estar.`,
      text3: `La Punta está a unos 20 minutos en taxi del aeropuerto de Puerto Escondido (o más corto, si vienes de la terminal de autobuses de la ciudad.`,
    };
  }
  return (
    <div className="generalInfo">
      <div className="rentHostData">
        <div className="rentData">
          <div className="rentHost">
            <h2>Anfitrión {props.host}</h2>
          </div>
          <div className="rentList">
            <ol className="rentDataList">
              <li>
                <span>{props.guest}</span>
              </li>
              <li>
                <span>.</span>
                <span>{props.bedrooms}</span>
              </li>
              <li>
                <span>.</span>
                <span>{props.beds}</span>
              </li>
              <li>
                <span>.</span>
                <span>{props.baths}</span>
              </li>
            </ol>
          </div>
        </div>
        <div className="rentProfileImg">
          <button className="rentProfileBtn">
            <div className="rentProfileI">
              <img
                className="pimg"
                aria-hidden="true"
                alt="cargando"
                decoding="async"
                elementtiming="LCP-target"
                src={props.profileImg}
              />
            </div>
          </button>
        </div>
      </div>
      <hr className="hr2" />
      <div className="highlightsContainer">
        <div className="highlightsStyleContainer">
          <div className="highlight" id="hight1">
            <div>
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
              >
                <path d="m16.8438 27.1562-.00005-3.39845-.2608465.0913211c-.9857292.3215073-2.0303948.5116467-3.1127817.5499306l-.4076218.0071983-.2927873-.0037049c-6.03236807-.1528291-10.89442655-5.0148222-11.04725775-11.0472069l-.00370495-.2927882.00370495-.2927873c.1528312-6.03236807 5.01488968-10.89442655 11.04725775-11.04725775l.2927873-.00370495.2927882.00370495c6.0323847.1528312 10.8943778 5.01488968 11.0472069 11.04725775l.0037049.2927873-.00663.3912275c-.0484899 1.4286741-.3615343 2.7917824-.8920452 4.0406989l-.1327748.2963236 7.90645 7.90705v5.5834h-5.5834l-4.12505-4.12545zm-6.5313-19.93745c1.708641 0 3.09375 1.38511367 3.09375 3.09375 0 1.7086436-1.3851064 3.09375-3.09375 3.09375-1.70863633 0-3.09375-1.385109-3.09375-3.09375 0-1.70863365 1.38511635-3.09375 3.09375-3.09375zm0 2.0625c-.56954635 0-1.03125.46170365-1.03125 1.03125 0 .5695521.46169942 1.03125 1.03125 1.03125.5695564 0 1.03125-.4616936 1.03125-1.03125 0-.56955058-.4616979-1.03125-1.03125-1.03125zm12.1147 15.81255 4.12455 4.12495h2.667v-2.667l-8.37295-8.37255.3697-.6775.1603998-.3074798c.56763-1.1397167.90791-2.4128858.9606815-3.761954l.0072187-.3697662-.0038197-.2688703c-.1397418-4.91222958-4.0963692-8.86881961-9.0086094-9.00856l-.2688709-.0038197-.2688703.0038197c-4.91222958.13974039-8.86881961 4.09633042-9.00856 9.00856l-.0038197.2688703.0038197.2688709c.14228112 5.0015536 4.24146819 9.0124291 9.2774303 9.0124291 1.4456308 0 2.8116781-.3298367 4.0293209-.9177001l.3012791-.1522999 1.5131-.7998-.00045 4.61975z"></path>
              </svg>
            </div>
            <div className="highlightStyle">
              <div className="hi1">Excelente proceso de llegada</div>
              <div className="hi2">
                El 90% de los huéspedes recientes calificaron con 5 estrellas el
                proceso de llegada.
              </div>
            </div>
          </div>
          <div className="highlight" id="hight2">
            <div>
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
              >
                <path d="M24 26c.988 0 1.945.351 2.671 1.009.306.276.71.445 1.142.483L28 27.5v2l-.228-.006a3.96 3.96 0 0 1-2.443-1.003A1.978 1.978 0 0 0 24 28c-.502 0-.978.175-1.328.491a3.977 3.977 0 0 1-2.67 1.009 3.977 3.977 0 0 1-2.672-1.009A1.978 1.978 0 0 0 16 28c-.503 0-.98.175-1.329.491a3.978 3.978 0 0 1-2.67 1.009 3.978 3.978 0 0 1-2.672-1.008A1.978 1.978 0 0 0 8 28c-.503 0-.98.175-1.33.491a3.96 3.96 0 0 1-2.442 1.003L4 29.5v-2l.187-.008a1.953 1.953 0 0 0 1.142-.483A3.975 3.975 0 0 1 8 26c.988 0 1.945.352 2.671 1.009.35.316.826.49 1.33.491.502 0 .979-.175 1.328-.492A3.974 3.974 0 0 1 16 26c.988 0 1.945.351 2.671 1.009.35.316.826.49 1.33.491.502 0 .979-.175 1.328-.491A3.975 3.975 0 0 1 23.999 26zm0-5c.988 0 1.945.351 2.671 1.009.306.276.71.445 1.142.483L28 22.5v2l-.228-.006a3.96 3.96 0 0 1-2.443-1.003A1.978 1.978 0 0 0 24 23c-.502 0-.978.175-1.328.491a3.977 3.977 0 0 1-2.67 1.009 3.977 3.977 0 0 1-2.672-1.009A1.978 1.978 0 0 0 16 23c-.503 0-.98.175-1.329.491a3.978 3.978 0 0 1-2.67 1.009 3.978 3.978 0 0 1-2.672-1.008A1.978 1.978 0 0 0 8 23c-.503 0-.98.175-1.33.491a3.96 3.96 0 0 1-2.442 1.003L4 24.5v-2l.187-.008a1.953 1.953 0 0 0 1.142-.483A3.975 3.975 0 0 1 8 21c.988 0 1.945.352 2.671 1.009.35.316.826.49 1.33.491.502 0 .979-.175 1.328-.492A3.974 3.974 0 0 1 16 21c.988 0 1.945.351 2.671 1.009.35.316.826.49 1.33.491.502 0 .979-.175 1.328-.491A3.975 3.975 0 0 1 23.999 21zM20 3a4 4 0 0 1 3.995 3.8L24 7v2h4v2h-4v5c.912 0 1.798.3 2.5.862l.171.147c.306.276.71.445 1.142.483L28 17.5v2l-.228-.006a3.96 3.96 0 0 1-2.443-1.003A1.978 1.978 0 0 0 24 18c-.502 0-.978.175-1.328.491a3.977 3.977 0 0 1-2.67 1.009 3.977 3.977 0 0 1-2.672-1.009A1.978 1.978 0 0 0 16 18c-.503 0-.98.175-1.329.491a3.978 3.978 0 0 1-2.67 1.009 3.978 3.978 0 0 1-2.672-1.008A1.978 1.978 0 0 0 8 18c-.503 0-.98.175-1.33.491a3.96 3.96 0 0 1-2.442 1.003L4 19.5v-2l.187-.008a1.953 1.953 0 0 0 1.142-.483A3.975 3.975 0 0 1 8 16c.988 0 1.945.352 2.671 1.009.35.316.826.49 1.33.491.502 0 .979-.175 1.328-.492a3.956 3.956 0 0 1 2.444-1.002L16 16v-5H4V9h12V7a2 2 0 0 0-3.995-.15L12 7h-2a4 4 0 0 1 7-2.645A3.985 3.985 0 0 1 20 3zm-2 13.523c.16.091.313.194.459.307l.212.179c.35.316.826.49 1.33.491.439 0 .86-.134 1.191-.38l.137-.111c.206-.187.431-.35.67-.486V11h-4zM20 5a2 2 0 0 0-1.995 1.85L18 7v2h4V7a2 2 0 0 0-2-2z"></path>
              </svg>
            </div>
            <div className="highlightStyle">
              <div className="hi1">Sumérgete</div>
              <div className="hi2">
                Este es uno de los pocos lugares en la zona con una alberca.
              </div>
            </div>
          </div>
          <div className="highlight" id="hight3">
            <div>
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
              >
                <path d="m11.6667 0-.00095 1.666h8.667l.00055-1.666h2l-.00055 1.666 6.00065.00063c1.0543745 0 1.9181663.81587127 1.9945143 1.85073677l.0054857.14926323v15.91907c0 .4715696-.1664445.9258658-.4669028 1.2844692l-.1188904.1298308-8.7476886 8.7476953c-.3334303.3332526-.7723097.5367561-1.2381975.5778649l-.1758207.0077398h-12.91915c-2.68874373 0-4.88181754-2.1223321-4.99538046-4.7831124l-.00461954-.2168876v-21.66668c0-1.05436021.81587582-1.91815587 1.85073739-1.99450431l.14926261-.00548569 5.999-.00063.00095-1.666zm16.66605 11.666h-24.666v13.6673c0 1.5976581 1.24893332 2.9036593 2.82372864 2.9949072l.17627136.0050928 10.999-.0003.00095-5.6664c0-2.6887355 2.122362-4.8818171 4.7832071-4.9953804l.2168929-.0046196 5.66595-.0006zm-.081 8-5.58495.0006c-1.5977285 0-2.9037573 1.2489454-2.9950071 2.8237299l-.0050929.1762701-.00095 5.5864zm-18.586-16-5.999.00062v5.99938h24.666l.00065-5.99938-6.00065-.00062.00055 1.66733h-2l-.00055-1.66733h-8.667l.00095 1.66733h-2z"></path>
              </svg>
            </div>
            <div className="highlightStyle">
              <div className="hi1">
                Cancelacion gratuita antes de {props.cancel}.
              </div>
              <div className="hi2"></div>
            </div>
          </div>
        </div>
      </div>
      <hr className="hr2" />
      <div className="highlightsStyleContainer">
        <div>
          <h2>
            <img
              className="airCoverImg"
              src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg"
              alt="AirCover"
            />
          </h2>
          <div className="airCoverText">
            Todas las reservaciones incluyen protección gratuita en caso de que
            el anfitrión cancele, de que haya imprecisiones en el anuncio o de
            que surjan otros inconvenientes, como problemas al momento de la
            llegada.
          </div>
          <Modal
            centered
            opened={opened}
            onClose={() => setOpened(false)}
            overflow="outside"
            withCloseButton={false}
            size="65%"
          >
            <AirCoverModal setOpened={setOpened} />
          </Modal>
          <button className="airCoverBtn" onClick={() => setOpened(true)}>
            <u>Aprender más</u>
          </button>
        </div>
      </div>
      <hr className="hr2" />
      <div>
        <div className="traduction">
          <div className="traductionsvg"></div>
          <div>
            <span className="traductionText"></span>

            <button className="traductionBtn"></button>
          </div>
        </div>
      </div>
      <div>
        <div className="rentDescription">
          <div>
            <span className="rentDescriptionTxt">{textDesc.text1}</span>
          </div>
          <div className="descriptionMore">
            <Modal
              centered
              opened={openShowMore}
              onClose={() => setOpenShowMore(false)}
              overflow="outside"
              withCloseButton={false}
              size="45%"
            >
              <DescriptionModal
                textDesc={textDesc}
                setOpened={setOpenShowMore}
              />
            </Modal>
            <button
              className="descriptionBtn"
              onClick={() => setOpenShowMore(true)}
            >
              <span className="descBtnFlex">
                <span className="descBtnTxt">
                  <u>Mostrar más</u>
                </span>
                <span className="descSvg">
                  <svg
                    viewBox="0 0 18 18"
                    role="presentation"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z"></path>
                  </svg>
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
      <hr className="hr2" />
      <GeneralBeds />
      <hr className="hr2" />
      <Amenities amenities={props.amenities} />
      <hr className="hr2" />
      <RentCalendar />
    </div>
  );
};

export default General;
