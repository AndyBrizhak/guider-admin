import { Show, SimpleShowLayout, TextField } from "react-admin";

export const ProvinceShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField source="url" label="URL Slug" />
    </SimpleShowLayout>
  </Show>
);
