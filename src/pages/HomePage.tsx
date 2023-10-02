import SearchBar from '../components/molecules/searchBar/SearchBar';
import './homePage.css';

export default function HomePage() {

    return (
        <div className="homePageContainer">
            <div className='homePageHeader'>
                <div className='homePageLogo'>
                    <h1>DUMBASS</h1>
                </div>
            </div>
            <SearchBar />
        </div>
    );
}
