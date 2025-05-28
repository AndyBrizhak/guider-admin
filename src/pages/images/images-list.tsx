/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */

import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  TextInput,
  UrlField,
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
      <TextField source="Place" label="Place" />
      <TextField source="City" label="City" />
      <TextField source="Province" label="Province" />
      <FunctionField
        label="Image URL"
        render={(record: any) => {
          // Удаляем ведущий слэш, если он есть, чтобы не было двойных слэшей
          const cleanPath = record.FilePath
            ? record.FilePath.replace(/^\/+/, "")
            : "";
          const imageUrl = cleanPath
            ? `${API_URL}/images/${cleanPath}`
            : "";
          return imageUrl ? (
            <div>
              <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                {imageUrl}
              </a>
              <br />
              <small style={{ color: "#666" }}>
                FilePath: {record.FilePath}
              </small>
            </div>
          ) : (
            "No image"
          );
        }}
      />
    </Datagrid>
  </List>
);

export default ImagesList;
