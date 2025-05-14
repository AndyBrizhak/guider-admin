import { EmailField, Show, SimpleShowLayout, TextField } from "react-admin";

export const UserShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="role" />
    </SimpleShowLayout>
  </Show>
);
