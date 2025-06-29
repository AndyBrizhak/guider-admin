/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */

import {
  List,
  Datagrid,
  TextField,
  TextInput,
  FunctionField,
} from "react-admin";

const imageFilters = [
  <TextInput label="Province" source="Province" alwaysOn />,
  <TextInput label="City" source="City" />,
  <TextInput label="Place" source="Place" />,
  <TextInput label="Image Name" source="ImageName" />,
];

const API_URL = import.meta.env.VITE_API_URL || "https://localhost:7001";

export const ImagesList = () => (
  <List filters={imageFilters}>
    <Datagrid rowClick="show">
      <TextField source="ImageName" label="Image Name" />
      <FunctionField
        label="Preview"
        render={(record: any) => {
          const cleanPath = record.FilePath
            ? record.FilePath.replace(/^\/+/, "")
            : "";
          const imageUrl = cleanPath ? `${cleanPath}` : "";
          return imageUrl ? (
            <img
              src={imageUrl}
              alt={record.ImageName || "preview"}
              style={{ maxWidth: 80, maxHeight: 60, objectFit: "contain" }}
            />
          ) : (
            ""
          );
        }}
      />
      <TextField source="Place" label="Place" />
      <TextField source="City" label="City" />
      <TextField source="Province" label="Province" />
    </Datagrid>
  </List>
);

export default ImagesList;
