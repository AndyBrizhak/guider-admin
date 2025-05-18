import { Edit, SimpleForm, TextInput, regex } from "react-admin";

const urlSlugValidator = [
  regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "URL slug должен содержать только строчные латинские буквы, цифры и дефисы",
  ),
];

export const ProvinceEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" validate={[]} />
      <TextInput
        source="url"
        label="URL Slug"
        validate={urlSlugValidator}
        helperText="Часть URL для страниц, связанных с провинцией"
      />
    </SimpleForm>
  </Edit>
);
