/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
import {
  Datagrid,
  EmailField,
  List,
  TextField,
  EditButton,
  TextInput,
} from "react-admin";

const userFilters = [
  <TextInput label="Search" source="q" alwaysOn />,
  <TextInput label="Username" source="username" defaultValue="" />,
  <TextInput label="Email" source="email" defaultValue="" />,
  <TextInput label="Role" source="role" defaultValue="" />,
];
export const UserList = () => (
  <List filters={userFilters}>
    <Datagrid>
      <TextField source="username" label="User" />
      <EmailField source="email" label="Email" />
      <TextField source="role" label="Role" />
      <EditButton label="Edit" />
    </Datagrid>
  </List>
);
