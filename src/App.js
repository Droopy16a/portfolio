import './style/App.css';
import Card from './Card.js';
import Section from './Section.js'
import Competences from './Competences.js';
import DiscordLogin from './Connect.js';

function App() {
  const cards = [<Card key={0} index={0} data={"python"}/>, <Card key={1} index={1} data={"JS"}/>, <Card key={2} index={2} data={"JS"}/>];
  const cards2 = [
  <Competences pr = {100} comp = "Python"/>, 
  <Competences pr = {95} comp = "HTML"/>, 
  <Competences pr = {85} comp = "JS"/>, 
  <Competences pr = {90} comp = "CSS"/>,
  <Competences pr = {80} comp = "React"/>,
  <Competences pr = {65} comp = "PHP"/>,
  <Competences pr = {90} comp = "Blender"/>,
  <Competences pr = {90} comp = "Photoshop"/>
];

  return (
    <div className="App">
      <h1 className='Titre'>Droopy's Portfolio</h1>
      <DiscordLogin/>
      {/* <div className="compe">
      <Competences
        pr = {90}
      />
      <Competences
        pr = {90}
      /> 
      </div> */}
      <Section 
        cards={cards2}
        titre="// Mes Compétences"
        id = {0}
      />
      <Section 
        cards={cards2}
        titre="// Mes Projets"
        id = {1}
      />

      {/* <div className='review'>
        <h2>Commentaires Client</h2>
      </div> */}

    </div>
  );
}

export default App;
