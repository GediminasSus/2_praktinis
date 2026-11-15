import { Link } from 'react-router-dom';

function Home() {
  return (
    <section>
        <h1>Receptu programele</h1>
        <p>Atrask receptus ir isaugok savo megstamiausius</p>

        <p>
            <Link to="/login">Prisijungti</Link>
            {" arba "}
            <Link to="/register">Registruotis</Link>
        </p>
    </section>
    );
}

export default Home;