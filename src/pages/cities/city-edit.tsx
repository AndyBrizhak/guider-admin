import {
  Edit,
  SimpleForm,
  TextInput,
  regex,
  NumberInput,
  useRecordContext,
} from "react-admin";

const urlSlugValidator = [
  regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "URL slug должен содержать только строчные латинские буквы, цифры и дефисы",
  ),
];

const longitudeValidator = [
  (value) => {
    if (value && (value < -180 || value > 180)) {
      return "Долгота должна быть в диапазоне от -180 до 180 градусов";
    }
    return undefined;
  },
];

const latitudeValidator = [
  (value) => {
    if (value && (value < -90 || value > 90)) {
      return "Широта должна быть в диапазоне от -90 до 90 градусов";
    }
    return undefined;
  },
];

// Кастомный компонент для NumberInput с динамическим placeholder
const LongitudeInput = (props) => {
  const record = useRecordContext();
  return (
    <NumberInput
      {...props}
      placeholder={
        record?.location?.coordinates?.[0] !== undefined
          ? String(record.location.coordinates[0])
          : "-84.3845"
      }
    />
  );
};

const LatitudeInput = (props) => {
  const record = useRecordContext();
  return (
    <NumberInput
      {...props}
      placeholder={
        record?.location?.coordinates?.[1] !== undefined
          ? String(record.location.coordinates[1])
          : "10.0973"
      }
    />
  );
};

export const CityEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput
        source="name"
        label="Название города"
        placeholder="Введите название города"
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
      />
      <LongitudeInput
        source="location.coordinates[0]"
        label="Долгота (Longitude)"
        validate={longitudeValidator}
        helperText="Значение от -180 до 180"
      />
      <LatitudeInput
        source="location.coordinates[1]"
        label="Широта (Latitude)"
        validate={latitudeValidator}
        helperText="Значение от -90 до 90"
      />
    </SimpleForm>
  </Edit>
);
