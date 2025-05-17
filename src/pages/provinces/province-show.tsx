import { Show, SimpleShowLayout, TextField } from "react-admin";

export const ProvinceShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" />
    </SimpleShowLayout>
  </Show>
);
