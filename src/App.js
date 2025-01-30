import './style/App.css';
import Card from './Card.js';
import Competences from './Competences.js';
import Moi from './Moi.js';
// import DiscordLogin from './Connect.js';
import Color from './Color.js';
import Partie from './Partie.js';

function App() {
  const cards2 = [<Moi
    texte={`<span>Bientôt</span>, en cours de développement...`}
  />];
  const cards = [
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
      <Color/>
      {/* <DiscordLogin/> */}
      {/* <div className="compe">
      <Competences
        pr = {90}
      />
      <Competences
        pr = {90}
      /> 
      </div> */}
      <Partie 
        cards={[
          <Moi
            texte={`Avec plus de <span>5 ans</span> d'expérience en développement, je suis un expert en Python, JavaScript, CSS et React. Mon objectif ? Transformer vos idées en projets concrets, performants et sur-mesure. 
            <ul>
            <li> <span>Code de qualité</span> : Grâce à ma maîtrise de Python, je conçois des solutions robustes, que ce soit pour des applications web, des scripts automatisés ou des analyses de données.</li>
            <li><span>Interfaces modernes</span> : Avec mes compétences en JavaScript, React et CSS, je crée des interfaces dynamiques, ergonomiques et esthétiques, parfaitement adaptées à vos besoins et à ceux de vos utilisateurs.</li>
            <li><span>Créativité au service du visuel</span> : Ma maîtrise de Blender et Photoshop me permet d’intégrer des visuels 3D, des animations et des designs percutants pour rendre vos projets uniques.</li>
            </ul>
            <span>Je ne me contente pas de coder</span> : je m’implique dans chaque projet, en veillant à la satisfaction de mes clients et en respectant toujours les délais. Si vous cherchez un développeur capable de mêler technique, design et innovation, je suis prêt à relever tous vos défis !`}
          />
          ]}
        titre="// A propos de Moi"
        id = {0}
      />
      <Partie 
        cards={cards}
        titre="// Mes Compétences"
        id = {1}
      />
      <Partie 
        cards={cards2}
        titre="// Mes Projets"
        id = {2}
      />

      {/* <div className='review'>
        <h2>Commentaires Client</h2>
      </div> */}

    </div>
  );
}

export default App;
