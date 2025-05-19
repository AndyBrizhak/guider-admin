import { Show, SimpleShowLayout, TextField } from "react-admin";

export const CityShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" label="Название города" />
      <TextField source="url" label="URL Slug" />
      <TextField source="province" label="Провинция" />
      <TextField source="location.longitude" label="Долгота" />
      <TextField source="location.latitude" label="Широта" />
    </SimpleShowLayout>
  </Show>
);
