import { Edit, SimpleForm, TextInput } from "react-admin";

export const ProvinceEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" validate={[]} />
    </SimpleForm>
  </Edit>
);
