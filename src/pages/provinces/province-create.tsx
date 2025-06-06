import { Create, SimpleForm, TextInput, required, regex } from "react-admin";

const urlSlugValidator = [
  regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Должен содержать только строчные буквы, цифры и дефисы",
  ),
];

export const ProvinceCreate = () => (
  <Create title="Create Province" disableAuthentication>
    <SimpleForm>
      <div style={{ maxWidth: 350 }}>
        <TextInput source="name" validate={required()} fullWidth />
        <TextInput
          source="url"
          label="URL Slug"
          validate={urlSlugValidator}
          helperText="Часть URL для страниц, связанных с провинцией"
          fullWidth
        />
      </div>
    </SimpleForm>
  </Create>
);
