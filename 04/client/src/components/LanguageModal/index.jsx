import './index.css'

function Button({text}) {

  return (<div className={`button ${text==='Spanish'?'active':''}`}>{text}</div>)
}
const languages = [
  'Spanish', 'English', 'Chinese', 
  'Corean', 'Portugese', 'Italian',
  'Deutch', 'Francais', 'Bahasa Indonesia',
  'Nederlands', 'Polski', 'Romana', 
  'Pycckn', 'Turk', 'Chino'
];

function LanguageModal({handleLanguageModal}){

    return(
      <div className="LanguageModal-container" onClick={handleLanguageModal}>
        <div className="content__container">
          <div className="title">
            <h3>Selecciona un Idioma</h3>
            <span>X</span>
          </div>
          <div className="main_content">
            {languages.map((language, i) => <Button key={i} text={language}/>)}
          </div>

        </div>
        
      </div>
    )
  }
  
  export default LanguageModal;