import Routes from './Routes.js';
import Header from './header';
import Container from './layout/ContainerBasic';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

const App = () => {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <Container>
          <Routes />
        </Container>
      </main>
    </div>
  );
}

export default App;
