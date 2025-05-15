import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { UserList } from "./pages/users/user-list";
import { UserCreate } from "./pages/users/user-create";
import { UserEdit } from "./pages/users/user-edit";
import PersonIcon from "@mui/icons-material/Person";
import { HomePage } from "./pages/homepage";
import { authProvider } from "./authProvider";
import { UserShow } from "./pages/users/user-show";

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    dashboard={HomePage}
    authProvider={authProvider}
  >
    <Resource
      icon={PersonIcon}
      name="users"
      //list={ListGuesser}
      list={UserList}
      // edit={EditGuesser}
      edit={UserEdit}
      //show={ShowGuesser}
      show={UserShow}
      create={UserCreate}
    />
  </Admin>
);
