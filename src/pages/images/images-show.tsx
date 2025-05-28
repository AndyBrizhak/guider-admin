import {
  Show,
  TabbedShowLayout,
  Tab,
  TextField,
  NumberField,
  DateField,
} from "react-admin";

export const ImagesShow = () => (
  <Show>
    <TabbedShowLayout>
      <Tab label="General">
        <TextField source="ImageName" label="Image Name" />
        <TextField source="Place" label="Place" />
        <TextField source="City" label="City" />
        <TextField source="Province" label="Province" />
        <TextField source="FilePath" label="File Path" />
      </Tab>
      <Tab label="Details">
        <TextField source="OriginalFileName" label="Original File Name" />
        <NumberField source="FileSize" label="File Size (bytes)" />
        <TextField source="ContentType" label="Content Type" />
        <TextField source="Extension" label="Extension" />
        <DateField source="UploadDate.$date" label="Upload Date" showTime />
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export default ImagesShow;
