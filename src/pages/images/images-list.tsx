import { List, Datagrid, TextField, DateField, NumberField } from "react-admin";

export const ImagesList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="Province" label="Province" />
      <TextField source="City" label="City" />
      <TextField source="Place" label="Place" />
      <TextField source="ImageName" label="Image Name" />
      <TextField source="FilePath" label="File Path" />
      <NumberField source="FileSize" label="File Size" />
      <TextField source="ContentType" label="Content Type" />
      <TextField source="Extension" label="Extension" />
      <DateField source="UploadDate.$date" label="Upload Date" showTime />
    </Datagrid>
  </List>
);

export default ImagesList;
