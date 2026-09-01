import './App.css';
import { CharacterView } from './character/components/CharacterView';
import idleFrame from './assets/characters/default/idle/01.png';

function App() {
  return (
    <main className="pet-app">
      <CharacterView
        frameSrc={idleFrame}
        direction="right"
        width={160}
        height={160}
      />
    </main>
  );
}

export default App;
