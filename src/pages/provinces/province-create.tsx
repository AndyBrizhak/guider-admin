import { Create, SimpleForm, TextInput, required } from "react-admin";

export const ProvinceCreate = () => (
  <Create title="Create Province" disableAuthentication>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
    </SimpleForm>
  </Create>
);
