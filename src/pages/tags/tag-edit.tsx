import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  SelectInput,
} from "react-admin";

const typeChoices = [
  { id: "Main", name: "Main" },
  { id: "Other", name: "Other" },
  { id: "Features", name: "Features" },
];

export const TagEdit = () => (
  <Edit title="Edit Tag">
    <SimpleForm>
      <TextInput source="name_en" label="Name (EN)" validate={required()} />
      <TextInput source="name_sp" label="Name (SP)" validate={required()} />
      <TextInput source="url" label="URL" validate={required()} />
      <SelectInput
        source="type"
        label="Type"
        choices={typeChoices}
        validate={required()}
      />
    </SimpleForm>
  </Edit>
);
