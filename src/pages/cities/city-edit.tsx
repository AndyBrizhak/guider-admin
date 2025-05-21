import {
  Edit,
  TabbedForm,
  FormTab,
  TextInput,
  regex,
  NumberInput,
  required,
} from "react-admin";

const urlSlugValidator = [
  regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "URL slug должен содержать только строчные латинские буквы, цифры и дефисы",
  ),
];

const longitudeValidator = [
  required(),
  (value) => {
    if (value && (value < -180 || value > 180)) {
      return "Долгота должна быть в диапазоне от -180 до 180 градусов";
    }
    return undefined;
  },
];

const latitudeValidator = [
  required(),
  (value) => {
    if (value && (value < -90 || value > 90)) {
      return "Широта должна быть в диапазоне от -90 до 90 градусов";
    }
    return undefined;
  },
];

export const CityEdit = () => (
  <Edit>
    <TabbedForm>
      <FormTab label="Основные данные">
        <TextInput
          source="name"
          label="Название города"
          placeholder="Введите название города"
          validate={required()}
        />
        <TextInput
          source="url"
          label="URL Slug"
          validate={urlSlugValidator}
          helperText="Часть URL для страниц, связанных с городом"
          placeholder="naranjo"
        />
        <TextInput
          source="province"
          label="Провинция"
          placeholder="Например: Alajuela"
          validate={required()}
        />
      </FormTab>
      <FormTab label="Гео">
        <NumberInput
          source="location.coordinates[0]"
          label="Долгота"
          validate={longitudeValidator}
          helperText="Значение от -180 до 180"
          placeholder="-84.3845"
        />
        <NumberInput
          source="location.coordinates[1]"
          label="Широта"
          validate={latitudeValidator}
          helperText="Значение от -90 до 90"
          placeholder="10.0973"
        />
      </FormTab>
    </TabbedForm>
  </Edit>
);
