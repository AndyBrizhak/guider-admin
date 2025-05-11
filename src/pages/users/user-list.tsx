import {
  Datagrid,
  EmailField,
  List,
  TextField,
  EditButton,
  TextInput,
} from "react-admin";

const userFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <TextInput source="name" label="Name" />,
  <TextInput source="username" label="Username" />,
  <TextInput source="email" label="Email" />,
];
export const UserList = () => {
  return (
    <List filters={userFilters}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="username" />
        <EmailField source="email" />
        <TextField source="address.street" />
        <TextField source="phone" />
        <TextField source="website" />
        <TextField source="company.name" />
        <EditButton />
      </Datagrid>
    </List>
  );
};
