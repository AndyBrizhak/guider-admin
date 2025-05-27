/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */

import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  TextInput,
} from "react-admin";

const imageFilters = [
  <TextInput label="Province" source="Province" alwaysOn />,
  <TextInput label="City" source="City" />,
  <TextInput label="Place" source="Place" />,
  <TextInput label="Image Name" source="ImageName" />,
];

export const ImagesList = () => (
  <List filters={imageFilters}>
    <Datagrid rowClick="show">
      <TextField source="ImageName" label="Image Name" />
      <TextField source="Place" label="Place" />
      <TextField source="City" label="City" />
      <TextField source="Province" label="Province" />
    </Datagrid>
  </List>
);

export default ImagesList;
