import "../styles/components/ModalLocation.scss"

const ModalLocation = () => {

    return (
        <>
            <div className="containerLocation">
                <p>Búsqueda por región</p>
                <div className="item">
                    <button><img src={`${process.env.PUBLIC_URL}/image/map1.png`} alt="map1" width="120px" height="120px" /> Búsqueda flexible</button>
                </div>
                <div className="item">
                    <button><img src={`${process.env.PUBLIC_URL}/image/map2.png`} alt="map2" width="120px" height="120px"/>Europa</button>
                </div>
                <div className="item">
                    <button><img src={`${process.env.PUBLIC_URL}/image/map3.png`} alt="map3" width="120px" height="120px"/>México</button>
                </div>
   
                <div className="item">
                    <button><img src={`${process.env.PUBLIC_URL}/image/map4.png`} alt="map4" width="120px" height="120px"/>Estados Unidos</button>
                </div>
                <div className="item">
                    <button><img src={`${process.env.PUBLIC_URL}/image/map5.png`} alt="map5" width="120px" height="120px"/>España</button>
                </div>
                <div className="item">
                    <button><img src={`${process.env.PUBLIC_URL}/image/map6.png`} alt="map6" width="120px" height="120px"/>Caribeña</button>
                </div>
            </div>

        </ >
    )

}

export default ModalLocation;
