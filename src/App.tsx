import { Admin, Resource, ListGuesser, EditGuesser, Show } from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { UserList } from "./pages/users/user-list";

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider}>
    <Resource name="posts" list={ListGuesser} edit={EditGuesser} show={Show} />
    <Resource name="users" list={UserList} edit={EditGuesser} show={Show} />
  </Admin>
);
