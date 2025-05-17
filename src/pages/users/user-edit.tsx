import { Edit, SimpleForm, TextInput, SelectInput } from "react-admin";

const roleChoices = [
  { id: "user", name: "user" },
  { id: "manager", name: "manager" },
  { id: "admin", name: "admin" },
  { id: "superadmin", name: "superadmin" },
];

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="username" />
      <TextInput source="email" />
      <SelectInput source="role" choices={roleChoices} />
    </SimpleForm>
  </Edit>
);
