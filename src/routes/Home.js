import { Link } from "react-router-dom";

const Home = () => (
  <div>
    <h1>home</h1>
    <h4>
      <Link to="/profile">gotoProfile</Link>
    </h4>
  </div>
);

export default Home;
