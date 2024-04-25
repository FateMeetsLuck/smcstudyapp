import FooterAnnotation from './FooterAnnotation.jsx'
import Header from './Header.jsx'
import MainContent from './MainContent.jsx';
import Sidebar from './Sidebar.jsx';

function App() {
    return (
      <>
        <div className="container">
          <div className="header">
            <Header />
          </div>
          <div className="content">
            <MainContent />
            <MainContent />
            <MainContent />
            <MainContent />
            <MainContent />
          </div>
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="footer">
            <FooterAnnotation />
          </div>
        </div>
        {/* Copyright notice */}
        <div className='copyright'>
          &copy; FateMeetsLuck {(new Date()).getFullYear()}
        </div>
      </>
    );
}

export default App;
