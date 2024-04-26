import Navbar from "./Navbar";
import MainContainer from "./MainContainer";

function App() {

    return (
      <>
        <header className='permanent-marker-regular'>
          <h1>Second Mile Christian Study App</h1>
        </header>
        <Navbar />
        <MainContainer />
        <footer>
          <p>&copy; FateMeetsLuck {(new Date()).getFullYear()}</p>
        </footer>
      </>
    );
}

export default App;
