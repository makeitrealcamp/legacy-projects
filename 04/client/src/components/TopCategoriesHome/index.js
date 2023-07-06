import ImageTitle from "./ImageTitle"
import desing from '../../images/TopCategoriesHomeImages/desing.jpg'
import development from '../../images/TopCategoriesHomeImages/development.jpg'
import marketing from '../../images/TopCategoriesHomeImages/marketing.jpg'
import itSoftware from '../../images/TopCategoriesHomeImages/it-and-software.jpg'
import personalDevelopment from '../../images/TopCategoriesHomeImages/personal-development.jpg'
import business from '../../images/TopCategoriesHomeImages/business.jpg'
import photography from '../../images/TopCategoriesHomeImages/photography.jpg'
import music from '../../images/TopCategoriesHomeImages/music.jpg'
function TopCategoriesHome({title}){

    return(
        <div className="main-container-top-categories-home">
        <h3 className="top-categories-home-title">{title}</h3>
        
            <div className="container-top-categories-home-wrap">
                <ImageTitle 
                img={desing}
                title='Design'
                />
                <ImageTitle 
                img={development}
                title='Development'
                />
                <ImageTitle 
                img={marketing}
                title='Marketing'
                />
                <ImageTitle 
                img={itSoftware}
                title='IT & Software'
                />
            </div>
        </div>
    )

}
export default TopCategoriesHome;