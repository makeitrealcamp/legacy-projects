import { MdSearch } from "react-icons/md";
function Search(){
    return(
        <form className="form-search-instructor-courses">
            <input type='text' className="input-search-instructor-courses" placeholder="Search your courses"/>
            <button className="btn-search-instructor-courses" type="button">
                <MdSearch />
            </button> 
        </form>
    )
}

export default Search;