import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/appContext";
import main from "../assets/main.svg";
import styled from "styled-components";

function Home() {
  const { user } = useGlobalContext();
  const navigate = useNavigate();
  return (
    <>
      {user && navigate("/dashboard")}
      <Wrapper>
        <nav>
          <p className="logo">TODO</p>
        </nav>
        <div className="container page">
          <div className="info">
            <h1>TODO Manager app</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Accusamus dolore fugiat culpa laboriosam velit distinctio debitis,
              ut aliquid temporibus delectus obcaecati. Voluptatem iusto,
              consectetur natus, exercitationem eaque laborum dolorem, nostrum
              repellendus ut nesciunt dolorum maxime? Laborum, odit animi autem
              architecto, alias consequatur maiores minima repellat perspiciatis
              nisi totam id provident.
            </p>

            <Link to="/register" className="btn hero-btn">
              Login / Register
            </Link>
          </div>
          <img src={main} alt="task manager" className="img main-img" />
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  .container {
    min-height: calc(100vh - 6rem);
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  .logo {
    color: #645cff;
    font-weight: bold;
    font-size: 36px;
  }
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: 6rem;
    display: flex;
    align-items: center;
  }
  h1 {
    font-weight: 700;
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .container {
      grid-template-columns: 1fr 1fr;
      column-gap: 6rem;
    }
    .main-img {
      display: block;
    }
  }
`;

export default Home;
