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
      {/* <FunctionField
        label="Description"
        render={(record: any) => {
          return record.description ? (
            <div
              style={{
                maxWidth: 200,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {record.description.length > 100
                ? `${record.description.substring(0, 100)}...`
                : record.description}
            </div>
          ) : (
            ""
          );
        }}
      /> */}
      <TextField source="category" label="Category" />
      {/* <TextField source="rating" label="Rating" /> */}
      {/* <FunctionField
        label="Created"
        render={(record: any) => {
          return record.createdAt
            ? new Date(record.createdAt).toLocaleDateString()
            : "";
        }}
      /> */}
    </Datagrid>
  </List>
);

export default PlacesList;
