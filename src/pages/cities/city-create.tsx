import {
  Create,
  TabbedForm,
  FormTab,
  TextInput,
  required,
  regex,
  SelectInput,
  NumberInput,
  useGetList,
} from "react-admin";

const urlSlugValidator = [
  regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "URL slug must contain only lowercase Latin letters, numbers, and hyphens",
  ),
];

const longitudeValidator = [
  required(),
  (value) => {
    if (value < -180 || value > 180) {
      return "Longitude must be between -180 and 180 degrees";
    }
    return undefined;
  },
];

const latitudeValidator = [
  required(),
  (value) => {
    if (value < -90 || value > 90) {
      return "Latitude must be between -90 and 90 degrees";
    }
    return undefined;
  },
];

export const CityCreate = () => {
  const { data: provinces = [], isLoading } = useGetList("provinces", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "name", order: "ASC" },
  });

  const provinceChoices = provinces.map((province) => ({
    id: province.name,
    name: province.name,
  }));

  return (
    <Create title="Create City" disableAuthentication>
      <TabbedForm>
        <FormTab label="Main Data">
          <TextInput source="name" validate={required()} label="City Name" />
          <TextInput
            source="url"
            label="URL Slug"
            validate={urlSlugValidator}
            helperText="Part of the URL for pages related to the city"
          />
          <SelectInput
            source="province"
            choices={provinceChoices}
            validate={required()}
            label="Province"
            optionText="name"
            optionValue="id"
            disabled={isLoading}
          />
        </FormTab>
        <FormTab label="Geo">
          <NumberInput
            source="location.longitude"
            label="Longitude"
            validate={longitudeValidator}
            helperText="Value from -180 to 180"
          />
          <NumberInput
            source="location.latitude"
            label="Latitude"
            validate={latitudeValidator}
            helperText="Value from -90 to 90"
          />
        </FormTab>
      </TabbedForm>
    </Create>
  );
};
