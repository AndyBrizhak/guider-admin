import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { UserList } from "./pages/users/user-list";
import { UserShow } from "./pages/users/user-show";
import { UserEdit } from "./pages/users/user-edit";
import PersonIcon from "@mui/icons-material/Person";

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider}>
    <Resource
      icon={PersonIcon}
      name="users"
      list={UserList}
      edit={UserEdit}
      show={UserShow}
    />
  </Admin>
);
