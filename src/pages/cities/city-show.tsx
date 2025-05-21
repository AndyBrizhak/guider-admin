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
      <Tab label="Гео">
        <NumberField source="location.coordinates[0]" label="Долгота" />
        <NumberField source="location.coordinates[1]" label="Широта" />
      </Tab>
    </TabbedShowLayout>
  </Show>
);
