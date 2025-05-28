import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  DateField,
} from "react-admin";

export const ImagesShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="ImageName" label="Image Name" />
      <TextField source="OriginalFileName" label="Original File Name" />
      <TextField source="FilePath" label="File Path" />
      <NumberField source="FileSize" label="File Size (bytes)" />
      <TextField source="ContentType" label="Content Type" />
      <TextField source="Extension" label="Extension" />
      <TextField source="Place" label="Place" />
      <TextField source="City" label="City" />
      <TextField source="Province" label="Province" />
      <DateField source="UploadDate.$date" label="Upload Date" showTime />
    </SimpleShowLayout>
  </Show>
);

export default ImagesShow;
