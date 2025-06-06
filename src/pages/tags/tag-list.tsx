/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
import { Datagrid, List, TextField, TextInput, SelectInput } from "react-admin";

const tagFilters = [
  <TextInput label="Search" source="q" alwaysOn />,
  <TextInput label="Name (EN)" source="name_en" defaultValue="" />,
  <TextInput label="Name (SP)" source="name_sp" defaultValue="" />,
  <TextInput label="URL Slug" source="url" defaultValue="" />,
  <SelectInput
    label="Type"
    source="type"
    choices={[
      { id: "Features", name: "Features" },
      { id: "Main", name: "Main" },
      { id: "Other", name: "Other" },
    ]}
    defaultValue=""
  />,
];

export const TagList = () => (
  <List filters={tagFilters}>
    <Datagrid>
      <TextField source="name_en" label="Name (EN)" />
      <TextField source="name_sp" label="Name (SP)" />
      <TextField source="url" label="URL Slug" />
      <TextField source="type" label="Type" />
    </Datagrid>
  </List>
);
