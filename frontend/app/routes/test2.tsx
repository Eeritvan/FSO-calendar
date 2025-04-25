import React from "react";
import type { Route } from "./+types/test";
import { gql } from "urql";
import { client } from "../root";
import type { UUID } from "crypto";
import { Form, type ActionFunctionArgs } from "react-router";

const GET_QUERY = gql`
  query getAllEvents {
    allEvents {
      id
      name
      description
      startTime
      endTime
    }
  }
`;

const DELETE_QUERY = gql`
  mutation DeleteEvent($id: UUID!) {
    deleteEvent(id: $id)
  }
`;

const ADD_QUERY = gql`
  mutation CreateEvent(
    $name: String!,
    $description: String,
    $startTime: Time!,
    $endTime: Time!) {
    createEvent(input: {
      name: $name,
      description: $description,
      startTime: $startTime,
      endTime: $endTime,
    }) {
      id
      name
      description
      startTime
      endTime
    }
  }
`;

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "test2" },
    { name: "description", content: "Welcome to React Router!" }
  ];
};

export const loader = async () => {
  // console.log("server event");
  const result = await client.query(GET_QUERY, {}).toPromise();
  return result?.data;
};

export const clientLoader = async ({ serverLoader }: Route.ClientLoaderArgs) => {
  // console.log("client event");
  const result = await client.query(GET_QUERY, {}).toPromise();
  return result?.data;
};

export const clientAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const time1 = new Date();
  const time2 = new Date();

  await client.mutation(
    ADD_QUERY, {
      name: name,
      description: description,
      startTime: time1,
      endTime: time2
    }).toPromise();
};

const Test2 = ({ loaderData }: Route.ComponentProps) => {
  return (
    <div>

      <div>
        Add event
        <Form method="post">
          <div>
            <label> name </label>
            <input type="text" name="name" required />
          </div>
          <div>
            <label> description </label>
            <input type="text" name="description" />
          </div>
          <button type="submit"> create </button>
        </Form>
      </div>

      <br />

      <div>
        All events
        <ul>
          {loaderData?.allEvents.map((event: any) => (
            <DisplayInfo key={event.id} event={ event } />
          ))}
        </ul>
      </div>

    </div>
  );
};

const deleteStuff = async (id: UUID) => {
  await client.mutation(DELETE_QUERY, { id: id }).toPromise();
};

const DisplayInfo = ({ event }: any) => {
  return (
    <li>
       {event.name} {event.description} {event.startTime} {event.endTime}
      <button onClick={() => deleteStuff(event.id)}> delete </button>
    </li>
  );
};

export default Test2;
