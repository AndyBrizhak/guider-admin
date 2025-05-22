import { Show, SimpleShowLayout, TextField } from "react-admin";

export const TagShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name_en" label="English Name" />
      <TextField source="name_sp" label="Spanish Name" />
      <TextField source="url" label="URL Slug" />
      <TextField source="type" />
    </SimpleShowLayout>
  </Show>
);
