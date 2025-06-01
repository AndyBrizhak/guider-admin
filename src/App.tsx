import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { UserList } from "./pages/users/user-list";
import { UserCreate } from "./pages/users/user-create";
import { UserEdit } from "./pages/users/user-edit";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public"; // Иконка для провинций
import LocationCityIcon from "@mui/icons-material/LocationCity"; // Иконка для городов
import LocalOfferIcon from "@mui/icons-material/LocalOffer"; // Иконка для тегов
import { HomePage } from "./pages/homepage";
import { authProvider } from "./authProvider";
import { UserShow } from "./pages/users/user-show";
import LoginWithRegister from "./pages/auth/login-wth-register.tsx";
// Импортируйте компоненты для провинций (создайте их, если ещё нет)
import { ProvinceList } from "./pages/provinces/province-list";
import { ProvinceCreate } from "./pages/provinces/province-create";
import { ProvinceEdit } from "./pages/provinces/province-edit";
import { ProvinceShow } from "./pages/provinces/province-show";
// Импорт компонентов для городов
import { CityList } from "./pages/cities/city-list";
import { CityCreate } from "./pages/cities/city-create";
import { CityEdit } from "./pages/cities/city-edit";
import { CityShow } from "./pages/cities/city-show";
// Импорт компонентов для тегов
import { TagList } from "./pages/tags/tag-list";
import { TagShow } from "./pages/tags/tag-show.tsx";
import { TagCreate } from "./pages/tags/tag-create.tsx";
import { TagEdit } from "./pages/tags/tag-edit.tsx";
// Импорт компонента для изображений
import { ImagesList } from "./pages/images/images-list";
import { ImagesShow } from "./pages/images/images-show";
import { ImagesCreate } from "./pages/images/images-create";

import { PlacesList } from "./pages/places/places-list";

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
    <Resource
      icon={LocationCityIcon}
      name="cities"
      list={CityList}
      edit={CityEdit}
      show={CityShow}
      create={CityCreate}
      options={{ mutationMode: "pessimistic" }}
    />
    <Resource
      icon={LocalOfferIcon}
      name="tags"
      list={TagList}
      show={TagShow}
      create={TagCreate}
      edit={TagEdit}
      options={{ mutationMode: "pessimistic" }}
    />
    <Resource
      name="images"
      list={ImagesList}
      show={ImagesShow}
      create={ImagesCreate}
      options={{ mutationMode: "pessimistic" }}
    />
    <Resource name="places" list={PlacesList} />
  </Admin>
);
