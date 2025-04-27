import type { Route } from "./+types/index";
import { gql } from "urql";
import { client } from "~/root";
import { Form } from "react-router";
import type { UUID } from "crypto";

export const meta = () => {
  return [
    { title: "main view" },
    { name: "description", content: "Testing react router!" }
  ];
};

interface EventType {
  id: UUID
  name: string
  description: string
  startTime: string
  endTime: string
}

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

export const loader = async () => {
  const result = await client.query(GET_QUERY, {}).toPromise();
  return result?.data;
};

export const clientLoader = async () => {
  const result = await client.query(GET_QUERY, {}).toPromise();
  return result?.data;
};

const MainView = ({ loaderData }: Route.ComponentProps) => {
  return (
    <div>
      Add event
      <Form action="new" method="post">
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

      <br />

      All events
      <ul>
        {loaderData?.allEvents.map((event: EventType) => (
          <li key={event.id}>
            {event.name} {event.description} {event.startTime} {event.endTime}
            <Form
              action={`/delete/${event.id}`}
              method="post"
            >
              <button type="submit"> delete </button>
            </Form>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainView;
