import { gql } from "urql";
import { client } from "~/root";
import { redirect } from "react-router";
import type { Route } from "./+types/delete";

const DELETE_QUERY = gql`
  mutation DeleteEvent($id: UUID!) {
    deleteEvent(id: $id)
  }
`;

export const clientAction = async ({ params }: Route.ActionArgs) => {
  const id = params.EventID;
  await client.mutation(DELETE_QUERY, { id: id }).toPromise();
  return redirect("/");
};
