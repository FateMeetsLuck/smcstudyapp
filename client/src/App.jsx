import Navbar from "./Navbar";
import ScriptureText from "./ScriptureText";

function App() {
    const paperId = 5;
    const sectionId = 3;
    const paragraphId = 2;
    return (
      <>
        <header className='permanent-marker-regular'>
          <h1>Second Mile Christian Study App</h1>
        </header>
        <Navbar />
        <ScriptureText paperId={paperId} sectionId={sectionId} paragraphId={paragraphId} />
        <footer>
          <p>&copy; FateMeetsLuck {(new Date()).getFullYear()}</p>
        </footer>
      </>
    );
}

export default App;
