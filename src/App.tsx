import { Admin, Resource, EditGuesser } from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { UserList } from "./pages/users/user-list";
import { UserShow } from "./pages/users/user-show";

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider}>
    <Resource name="users" list={UserList} edit={EditGuesser} show={UserShow} />
  </Admin>
);
