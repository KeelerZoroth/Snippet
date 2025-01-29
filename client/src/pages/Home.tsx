import "../assets/styles/home.css"; // Import CSS
import { SearchBar } from "../components/SearchBar";

const Home = () => {
    return (
        <section className="home-container">
            <SearchBar></SearchBar>
        </section>
        
    );
};

export default Home;
