import { Create, SimpleForm, TextInput, required, email } from "react-admin";

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="username" validate={required()} />
      <TextInput source="email" validate={[required(), email()]} />
      <TextInput source="password" type="password" validate={required()} />
    </SimpleForm>
  </Create>
);
