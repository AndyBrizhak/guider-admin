import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  required,
} from "react-admin";

export const ImagesCreate = () => (
  <Create title="Create Image">
    <SimpleForm>
      <TextInput source="ImageName" label="Image Name" validate={required()} />
      <TextInput
        source="OriginalFileName"
        label="Original File Name"
        validate={required()}
      />
      <TextInput source="FilePath" label="File Path" validate={required()} />
      <NumberInput
        source="FileSize"
        label="File Size (bytes)"
        validate={required()}
      />
      <TextInput
        source="ContentType"
        label="Content Type"
        validate={required()}
      />
      <TextInput source="Extension" label="Extension" validate={required()} />
      <TextInput source="Place" label="Place" validate={required()} />
      <TextInput source="City" label="City" validate={required()} />
      <TextInput source="Province" label="Province" validate={required()} />
    </SimpleForm>
  </Create>
);
