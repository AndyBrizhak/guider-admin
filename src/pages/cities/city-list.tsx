/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
import {
  Datagrid,
  List,
  TextField,
  EditButton,
  TextInput,
  ShowButton,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  ArrayField,
  SingleFieldList,
  ChipField,
} from "react-admin";

const cityFilters = [
  <TextInput label="Search" source="q" alwaysOn />,
  <TextInput label="Name" source="name" defaultValue="" />,
  <TextInput label="URL Slug" source="url" defaultValue="" />,
  <ReferenceInput source="province" reference="provinces">
    <SelectInput label="Province" optionText="name" />
  </ReferenceInput>,
];

export const CityList = () => (
  <List filters={cityFilters}>
    <Datagrid>
      <TextField source="name" label="Name" />
      <TextField source="url" label="URL Slug" />
      <TextField source="province" label="Province" />
      <ArrayField source="location.coordinates" label="Coordinates">
        <SingleFieldList>
          <ChipField source="" />
        </SingleFieldList>
      </ArrayField>
      <ShowButton label="Show" />
      <EditButton label="Edit" />
    </Datagrid>
  </List>
);
