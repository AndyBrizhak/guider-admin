import {
  Show,
  TabbedShowLayout,
  Tab,
  TextField,
  NumberField,
} from "react-admin";

export const CityShow = () => (
  <Show>
    <TabbedShowLayout>
      <Tab label="Основные данные">
        <TextField source="name" label="Название города" />
        <TextField source="url" label="URL Slug" />
        <TextField source="province" label="Провинция" />
      </Tab>
      <Tab label="Geo">
        <NumberField source="location.longitude" label="Longitude" />
        <NumberField source="location.latitude" label="Latitude" />
      </Tab>
    </TabbedShowLayout>
  </Show>
);
