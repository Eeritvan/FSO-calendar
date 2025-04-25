import { gql } from "urql";
import type { Route } from "./+types/test";

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "test1" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const Test = () => {
  return (
    <div>
      test
    </div>
  );
};

export default Test;