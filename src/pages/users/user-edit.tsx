import { Edit, SimpleForm, TextInput, SelectInput } from "react-admin";

const roleChoices = [
  { id: "user", name: "user" },
  { id: "manager", name: "manager" },
  { id: "admin", name: "admin" },
  { id: "superadmin", name: "superadmin" },
];

export const UserEdit = () => (
  <Edit>
    <SimpleForm
      style={{
        width: "75vw",
        maxWidth: "75vw",
        marginRight: "10vw",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <TextInput source="username" label="Username" fullWidth />
      <TextInput source="email" label="Email" fullWidth />
      <SelectInput source="role" label="Role" choices={roleChoices} fullWidth />
    </SimpleForm>
  </Edit>
);
