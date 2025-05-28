import {
  Create,
  SimpleForm,
  TextInput,
  required,
  FileInput,
  FileField,
} from "react-admin";

export const ImagesCreate = () => (
  <Create title="Create Image">
    <SimpleForm>
      <FileInput
        source="file"
        label="Image File"
        accept=".jpg,.jpeg,.png,.gif,.bmp,.webp"
        validate={required()}
        maxSize={10000000} // 10MB максимум
      >
        <FileField source="src" title="title" />
      </FileInput>
      <TextInput
        source="ImageName"
        label="Image Name"
        validate={required()}
        helperText="Имя файла (можно без расширения)"
      />
      <TextInput
        source="Place"
        label="Place"
        validate={required()}
        helperText="Название места"
      />
      <TextInput
        source="City"
        label="City"
        helperText="Город (необязательно)"
      />
      <TextInput
        source="Province"
        label="Province"
        validate={required()}
        helperText="Область/провинция"
      />
    </SimpleForm>
  </Create>
);
