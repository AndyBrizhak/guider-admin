/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */

import {
  List,
  Datagrid,
  TextField,
  TextInput,
  FunctionField,
  UrlField,
} from "react-admin";

const placeFilters = [
  <TextInput label="Search" source="q" alwaysOn />,
  <TextInput label="Province" source="province" />,
  <TextInput label="City" source="city" />,
  <TextInput label="Name" source="name" />,
  <TextInput label="URL" source="url" />,
  <TextInput label="Status" source="status" />, // добавлен фильтр по статусу
];

export const PlacesList = () => (
  <List filters={placeFilters} resource="places">
    <Datagrid rowClick="show">
      <TextField source="name" label="Name" />
      <FunctionField
        label="City"
        render={(record: any) => record.address?.city || ""}
        sortBy="address.city"
        sortable={true}
      />
      <FunctionField
        label="Province"
        render={(record: any) => record.address?.province || ""}
        sortBy="address.province"
        sortable={true}
      />
      <UrlField source="url" label="URL" target="_blank" />
      <TextField source="category" label="Category" />
      <FunctionField
        label="Status"
        render={(record: any) => record.status ?? ""}
        sortBy="status"
        sortable={true}
      />
    </Datagrid>
  </List>
);

export default PlacesList;
