import { useState } from 'react';
import '../styles/global.css';

function StyleGuide() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="container">
      <h1>MyBoulders Style Guide</h1>
      
      <section className="card">
        <h2>Color Palette</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
          <div>
            <div style={{ height: '100px', backgroundColor: 'var(--color-background)', borderRadius: 'var(--border-radius-md)', marginBottom: 'var(--space-2)' }}></div>
            <p>Background</p>
          </div>
          <div>
            <div style={{ height: '100px', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--border-radius-md)', marginBottom: 'var(--space-2)' }}></div>
            <p>Surface</p>
          </div>
          <div>
            <div style={{ height: '100px', backgroundColor: 'var(--color-surface-variant)', borderRadius: 'var(--border-radius-md)', marginBottom: 'var(--space-2)' }}></div>
            <p>Surface Variant</p>
          </div>
          <div>
            <div style={{ height: '100px', backgroundColor: 'var(--color-primary)', borderRadius: 'var(--border-radius-md)', marginBottom: 'var(--space-2)' }}></div>
            <p>Primary</p>
          </div>
          <div>
            <div style={{ height: '100px', backgroundColor: 'var(--color-primary-dark)', borderRadius: 'var(--border-radius-md)', marginBottom: 'var(--space-2)' }}></div>
            <p>Primary Dark</p>
          </div>
          <div>
            <div style={{ height: '100px', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--border-radius-md)', marginBottom: 'var(--space-2)' }}></div>
            <p>Primary Light</p>
          </div>
          <div>
            <div style={{ height: '100px', backgroundColor: 'var(--color-secondary)', borderRadius: 'var(--border-radius-md)', marginBottom: 'var(--space-2)' }}></div>
            <p>Secondary</p>
          </div>
          <div>
            <div style={{ height: '100px', backgroundColor: 'var(--color-accent)', borderRadius: 'var(--border-radius-md)', marginBottom: 'var(--space-2)' }}></div>
            <p>Accent</p>
          </div>
        </div>
      </section>

      <section className="card" style={{ marginTop: 'var(--space-4)' }}>
        <h2>Typography</h2>
        <div className="bg-surface" style={{ padding: 'var(--space-4)', borderRadius: 'var(--border-radius-md)' }}>
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>
          <h5>Heading 5</h5>
          <h6>Heading 6</h6>
          <p>Regular paragraph text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
          <p className="text-primary">Primary text color</p>
          <p className="text-secondary">Secondary text color</p>
          <p className="text-accent">Accent text color</p>
          <p><a href="#">This is a link</a> inside paragraph text.</p>
        </div>
      </section>

      <section className="card" style={{ marginTop: 'var(--space-4)' }}>
        <h2>Buttons</h2>
        <div className="bg-surface" style={{ padding: 'var(--space-4)', borderRadius: 'var(--border-radius-md)', display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <button>Primary Button</button>
          <button style={{ backgroundColor: 'var(--color-secondary)' }}>Secondary Button</button>
          <button style={{ backgroundColor: 'var(--color-accent)' }}>Accent Button</button>
          <button style={{ backgroundColor: 'var(--color-success)' }}>Success</button>
          <button style={{ backgroundColor: 'var(--color-error)' }}>Error</button>
          <button style={{ backgroundColor: 'var(--color-warning)' }}>Warning</button>
          <button style={{ backgroundColor: 'var(--color-info)' }}>Info</button>
          <button onClick={() => setCount(count + 1)}>
            Clicked {count} times
          </button>
        </div>
      </section>

      <section className="card" style={{ marginTop: 'var(--space-4)' }}>
        <h2>Cards &amp; Surfaces</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
          <div className="bg-surface" style={{ padding: 'var(--space-4)', borderRadius: 'var(--border-radius-md)' }}>
            <h3>Regular Surface</h3>
            <p>This shows content on the surface color.</p>
          </div>
          <div className="bg-surface-variant" style={{ padding: 'var(--space-4)', borderRadius: 'var(--border-radius-md)' }}>
            <h3>Surface Variant</h3>
            <p>This shows content on the surface variant color.</p>
          </div>
          <div className="card">
            <h3>Example Card</h3>
            <p>This is a card component that has hover effects.</p>
            <button>Action</button>
          </div>
        </div>
      </section>

      <section className="card" style={{ marginTop: 'var(--space-4)' }}>
        <h2>Status Colors</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
          <div style={{ backgroundColor: 'var(--color-success)', color: 'white', padding: 'var(--space-3)', borderRadius: 'var(--border-radius-md)' }}>
            <h3>Success</h3>
            <p>Used for successful actions</p>
          </div>
          <div style={{ backgroundColor: 'var(--color-error)', color: 'white', padding: 'var(--space-3)', borderRadius: 'var(--border-radius-md)' }}>
            <h3>Error</h3>
            <p>Used for error messages</p>
          </div>
          <div style={{ backgroundColor: 'var(--color-warning)', color: 'black', padding: 'var(--space-3)', borderRadius: 'var(--border-radius-md)' }}>
            <h3>Warning</h3>
            <p>Used for warnings</p>
          </div>
          <div style={{ backgroundColor: 'var(--color-info)', color: 'white', padding: 'var(--space-3)', borderRadius: 'var(--border-radius-md)' }}>
            <h3>Info</h3>
            <p>Used for information</p>
          </div>
        </div>
      </section>

      <section className="card" style={{ marginTop: 'var(--space-4)' }}>
        <h2>Layout &amp; Spacing</h2>
        <div className="bg-surface" style={{ padding: 'var(--space-4)', borderRadius: 'var(--border-radius-md)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div style={{ height: 'var(--space-1)', backgroundColor: 'var(--color-primary)', borderRadius: 'var(--border-radius-sm)' }}></div>
            <p>Space 1 (0.25rem)</p>
            
            <div style={{ height: 'var(--space-2)', backgroundColor: 'var(--color-primary)', borderRadius: 'var(--border-radius-sm)' }}></div>
            <p>Space 2 (0.5rem)</p>
            
            <div style={{ height: 'var(--space-3)', backgroundColor: 'var(--color-primary)', borderRadius: 'var(--border-radius-sm)' }}></div>
            <p>Space 3 (1rem)</p>
            
            <div style={{ height: 'var(--space-4)', backgroundColor: 'var(--color-primary)', borderRadius: 'var(--border-radius-sm)' }}></div>
            <p>Space 4 (1.5rem)</p>
            
            <div style={{ height: 'var(--space-5)', backgroundColor: 'var(--color-primary)', borderRadius: 'var(--border-radius-sm)' }}></div>
            <p>Space 5 (2rem)</p>
            
            <div style={{ height: 'var(--space-6)', backgroundColor: 'var(--color-primary)', borderRadius: 'var(--border-radius-sm)' }}></div>
            <p>Space 6 (3rem)</p>
          </div>
        </div>
      </section>

      <section className="card" style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <h2>Border Radius</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 'var(--space-4)' }}>
          <div>
            <div style={{ height: '100px', backgroundColor: 'var(--color-primary)', borderRadius: 'var(--border-radius-sm)', marginBottom: 'var(--space-2)' }}></div>
            <p>Border Radius Small</p>
          </div>
          <div>
            <div style={{ height: '100px', backgroundColor: 'var(--color-primary)', borderRadius: 'var(--border-radius-md)', marginBottom: 'var(--space-2)' }}></div>
            <p>Border Radius Medium</p>
          </div>
          <div>
            <div style={{ height: '100px', backgroundColor: 'var(--color-primary)', borderRadius: 'var(--border-radius-lg)', marginBottom: 'var(--space-2)' }}></div>
            <p>Border Radius Large</p>
          </div>
          <div>
            <div style={{ height: '100px', backgroundColor: 'var(--color-primary)', borderRadius: 'var(--border-radius-xl)', marginBottom: 'var(--space-2)' }}></div>
            <p>Border Radius XL</p>
          </div>
          <div>
            <div style={{ height: '100px', width: '100px', backgroundColor: 'var(--color-primary)', borderRadius: 'var(--border-radius-round)', marginBottom: 'var(--space-2)' }}></div>
            <p>Border Radius Round</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default StyleGuide;