import { useNavigate } from "react-router";

const Test = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(-1)}>
        back
      </button>

      testtest

      testtest
    </div>
  );
};

export default Test;
