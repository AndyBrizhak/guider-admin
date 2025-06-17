/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
import {
  Datagrid,
  List,
  TextField,
  EditButton,
  TextInput,
  ShowButton,
} from "react-admin";

const provinceFilters = [
  <TextInput label="Search" source="q" alwaysOn />,
  <TextInput label="Name" source="name" defaultValue="" />,
  <TextInput label="URL Slug" source="url" defaultValue="" />,
];

export const ProvinceList = () => (
  <List filters={provinceFilters}>
    <Datagrid>
      <TextField source="name" label="Name" />
      <TextField source="url" label="URL Slug" />
      <ShowButton label="Show" />
      <EditButton label="Edit" />
    </Datagrid>
  </List>
);
