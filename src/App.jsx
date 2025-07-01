import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const enhanceImage = async () => {
      const response = await fetch('/api/enhance-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: 'https://via.placeholder.com/400' })
      });

      const data = await response.json();
      console.log('Risposta dalla funzione:', data);
    };

    enhanceImage();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Test chiamata funzione edge</h1>
      <p>Apri la console per vedere la risposta.</p>
    </div>
  );
}

export default App;
