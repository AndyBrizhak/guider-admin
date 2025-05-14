import { Datagrid, EmailField, List, TextField, EditButton } from "react-admin";

export const UserList = () => (
  <List>
    <Datagrid>
      <TextField source="username" label="User" />
      <EmailField source="email" label="Email" />
      <TextField source="role" label="Role" />
      <EditButton label="Edit" />
    </Datagrid>
  </List>
);
