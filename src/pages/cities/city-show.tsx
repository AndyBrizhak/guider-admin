import {
  Show,
  SimpleShowLayout,
  TextField,
  ReferenceField,
  ArrayField,
  SingleFieldList,
  ChipField,
} from "react-admin";

export const CityShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" label="Название города" />
      <TextField source="url" label="URL Slug" />
      <TextField source="province" label="Провинция" />
      <ArrayField source="location.coordinates" label="Координаты">
        <SingleFieldList>
          <ChipField source="" />
        </SingleFieldList>
      </ArrayField>
    </SimpleShowLayout>
  </Show>
);
