import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/profile">profile</Link>
        </li>
        <li>
          <Link to="/chat">chat</Link>
        </li>
        <li>
          <Link to="/calendar">calendar</Link>
        </li>
        <li>
          <Link to="/photo">photo</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
