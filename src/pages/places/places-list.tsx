/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */

import {
  List,
  Datagrid,
  TextField,
  TextInput,
  FunctionField,
} from "react-admin";

const placeFilters = [
  <TextInput label="Search" source="q" alwaysOn />,
  <TextInput label="Province" source="province" />,
  <TextInput label="City" source="city" />,
  <TextInput label="Name" source="name" />,
  <TextInput label="Status" source="status" />, // добавлен фильтр по статусу
];

const statusColor = (status: string) => {
  switch (status) {
    case "active":
      return "green";
    case "inactive":
      return "gray";
    case "draft":
      return "goldenrod";
    case "pending":
      return "red";
    default:
      return "inherit";
  }
};

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
      <TextField source="category" label="Category" />
      <FunctionField
        label="Status"
        render={(record: any) => (
          <span style={{ color: statusColor(record.status) }}>
            {record.status ?? ""}
          </span>
        )}
        sortBy="status"
        sortable={true}
      />
    </Datagrid>
  </List>
);

export default PlacesList;
