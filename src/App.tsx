import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { UserList } from "./pages/users/user-list";
import { UserCreate } from "./pages/users/user-create";
import { UserEdit } from "./pages/users/user-edit";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public"; // Иконка для провинций
import { HomePage } from "./pages/homepage";
import { authProvider } from "./authProvider";
import { UserShow } from "./pages/users/user-show";
import LoginWithRegister from "./pages/auth/login-wth-register.tsx";
// Импортируйте компоненты для провинций (создайте их, если ещё нет)
import { ProvinceList } from "./pages/provinces/province-list";
import { ProvinceCreate } from "./pages/provinces/province-create";
import { ProvinceEdit } from "./pages/provinces/province-edit";
import { ProvinceShow } from "./pages/provinces/province-show";

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    dashboard={HomePage}
    loginPage={LoginWithRegister}
    authProvider={authProvider}
    // requireAuth
  >
    <Resource
      icon={PersonIcon}
      name="users"
      list={UserList}
      edit={UserEdit}
      show={UserShow}
      create={UserCreate}
      options={{ mutationMode: "pessimistic" }}
    />
    <Resource
      icon={PublicIcon}
      name="provinces"
      list={ProvinceList}
      edit={ProvinceEdit}
      show={ProvinceShow}
      create={ProvinceCreate}
      options={{ mutationMode: "pessimistic" }}
    />
  </Admin>
);
