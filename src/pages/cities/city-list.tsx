/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
import {
  Datagrid,
  List,
  TextField,
  EditButton,
  TextInput,
  ShowButton,
  ArrayField,
  SingleFieldList,
  ChipField,
} from "react-admin";

const cityFilters = [
  <TextInput label="Search" source="q" alwaysOn />,
  <TextInput label="Name" source="name" defaultValue="" />,
  <TextInput label="URL Slug" source="url" defaultValue="" />,
  <TextInput label="Province" source="province" defaultValue="" />, // фильтр по названию провинции
];

export const CityList = () => (
  <List filters={cityFilters}>
    <Datagrid>
      <TextField source="name" label="Name" />
      <TextField source="url" label="URL Slug" />
      <TextField source="province" label="Province" />
      <ShowButton label="Show" />
      <EditButton label="Edit" />
    </Datagrid>
  </List>
);
