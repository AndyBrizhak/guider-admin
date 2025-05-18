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
      <TextInput source="name" validate={required()} />
      <TextInput
        source="url"
        label="URL Slug"
        validate={urlSlugValidator}
        helperText="Часть URL для страниц, связанных с провинцией"
      />
    </SimpleForm>
  </Create>
);
