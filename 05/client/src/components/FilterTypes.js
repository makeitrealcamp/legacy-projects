// import '../styles/components/FilterTypes.scss';
// import ButtonFilter from './ButtonFilter';
// import flecha from '../styles/icons/chevronRight.svg'


// const FilterTypes = ()=>{

//     const names = ['Impresionantes', 'Minicasas','Parques nacionales','Artico','Cabanas','Islas','Campamentos','Casas Alpinas','Diseno',
//                     'Piscinas increibles','surf']

//     const filterImages = require.context('../styles/filterbar')
//     const images = filterImages.keys().map((path,index)=>{
//         let rObj = {}
//         rObj['name'] = names[index]
//         rObj['path'] = path
//         rObj['file'] = filterImages(path)
//         return rObj
//     })
    
//     return(
//         <div className='header__touch'>
//             <div className="header__touch__types">
//                 {images.map(
//                     element => {
//                         return(
//                             <div key={element.name}>
//                                 <button>
//                                         <img src={element.file}></img>
//                                         <span>{element.name}</span>
//                                 </button>
//                             </div>
//                         )})}
//             </div>
//             <div className='header__touch__filter'>
//                 <button>
//                     <div className="flecha">
//                         <button className="flecha__button">
//                             <img src={flecha}></img>
//                         </button>
//                     </div>
//                 </button>
//                 <ButtonFilter/>
//             </div>
//         </div>
//     )
// }


// export default FilterTypes