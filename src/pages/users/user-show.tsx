import { EmailField, Show, SimpleShowLayout, TextField } from "react-admin";

export const UserShow = () => (
  <Show>
    <div style={{ width: "75vw", maxWidth: "75vw" }}>
      <SimpleShowLayout>
        <TextField source="username" />
        <EmailField source="email" />
        <TextField source="role" />
      </SimpleShowLayout>
    </div>
  </Show>
);
