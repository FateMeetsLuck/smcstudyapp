import Footer from './Footer.jsx'
import Header from './Header.jsx'
import Container from './Container.jsx';

function App() {
  const numbering = "3:0.1";
  const passage = "GOD is everywhere present; the Universal Father rules the circle of eternity. But he rules in the local universes in the persons of his Paradise Creator Sons, even as he bestows life through these Sons. “God has given us eternal life, and this life is in his Sons.” These Creator Sons of God are the personal expression of himself in the sectors of time and to the children of the whirling planets of the evolving universes of space.";
  const comment = "This passage highlights the omnipresence of God, the Universal Father, emphasizing His governance over the entirety of eternity and His method of rule in the local universes through His Paradise Creator Sons. These Sons act as both rulers and conduits of life, suggesting a dual role of governance and spiritual sustenance. The phrase, 'God has given us eternal life, and this life is in his Sons,' underscores the theological concept that eternal life is accessible through these divine intermediaries, reflecting a common theme in many religious texts where divine figures serve as both leaders and essential lifelines to the spiritual realm. The Creator Sons are depicted not just as rulers but as personal expressions of God himself, bridging the infinite with the finite and making the divine accessible to the 'children of the whirling planets'—a poetic depiction of beings inhabiting the evolving universes. This passage thus serves to connect the macrocosm of divine governance with the microcosm of individual spiritual experience.";
  return (
    <>
    <Header/>
    <Container refID={numbering} text={passage} note={comment} />
    <Container refID={numbering} text={passage} note="" />
    <Container refID={numbering} text={passage} note={comment} />
    <Footer/>
    </>
  );
}

export default App;
