import {
  Create,
  SimpleForm,
  TextInput,
  required,
  regex,
  ReferenceInput,
  SelectInput,
  NumberInput,
} from "react-admin";

const urlSlugValidator = [
  regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Должен содержать только строчные буквы, цифры и дефисы",
  ),
];

const longitudeValidator = [
  required(),
  (value) => {
    if (value < -180 || value > 180) {
      return "Долгота должна быть в диапазоне от -180 до 180 градусов";
    }
    return undefined;
  },
];

const latitudeValidator = [
  required(),
  (value) => {
    if (value < -90 || value > 90) {
      return "Широта должна быть в диапазоне от -90 до 90 градусов";
    }
    return undefined;
  },
];

export const CityCreate = () => (
  <Create title="Create City" disableAuthentication>
    <SimpleForm>
      <TextInput source="name" validate={required()} label="Название города" />
      <TextInput
        source="url"
        label="URL Slug"
        validate={urlSlugValidator}
        helperText="Часть URL для страниц, связанных с городом"
      />
      <ReferenceInput
        source="province"
        reference="provinces"
        validate={required()}
      >
        <SelectInput optionText="name" label="Провинция" />
      </ReferenceInput>
      <NumberInput
        source="location.coordinates[0]"
        label="Долгота (Longitude)"
        validate={longitudeValidator}
        helperText="Значение от -180 до 180"
      />
      <NumberInput
        source="location.coordinates[1]"
        label="Широта (Latitude)"
        validate={latitudeValidator}
        helperText="Значение от -90 до 90"
      />
    </SimpleForm>
  </Create>
);
