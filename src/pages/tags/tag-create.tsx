import {
  Create,
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

export const TagCreate = () => (
  <Create title="Create Tag">
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
  </Create>
);
