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
    "URL slug must contain only lowercase Latin letters, numbers, and hyphens",
  ),
];

const longitudeValidator = [
  required(),
  (value) => {
    if (value && (value < -180 || value > 180)) {
      return "Longitude must be between -180 and 180 degrees";
    }
    return undefined;
  },
];

const latitudeValidator = [
  required(),
  (value) => {
    if (value && (value < -90 || value > 90)) {
      return "Latitude must be between -90 and 90 degrees";
    }
    return undefined;
  },
];

export const CityEdit = () => (
  <Edit>
    <TabbedForm>
      <FormTab label="Main Data">
        <TextInput
          source="name"
          label="City Name"
          placeholder="Enter city name"
          validate={required()}
        />
        <TextInput
          source="url"
          label="URL Slug"
          validate={urlSlugValidator}
          helperText="Part of the URL for pages related to the city"
          placeholder="abangares"
        />
        <TextInput
          source="province"
          label="Province"
          placeholder="e.g. Guanacaste"
          validate={required()}
        />
      </FormTab>
      <FormTab label="Geo">
        <NumberInput
          source="location.longitude"
          label="Longitude"
          validate={longitudeValidator}
          helperText="Value from -180 to 180"
          placeholder="-85.067"
        />
        <NumberInput
          source="location.latitude"
          label="Latitude"
          validate={latitudeValidator}
          helperText="Value from -90 to 90"
          placeholder="10.26"
        />
      </FormTab>
    </TabbedForm>
  </Edit>
);
