/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */

import {
  Create,
  SimpleForm,
  TextInput,
  required,
  FileInput,
  FileField,
  SelectInput,
  useGetList,
  regex,
  FormDataConsumer,
} from "react-admin";

const urlSlugValidator = regex(
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  "Image Name must contain only lowercase letters, numbers, and hyphens",
);

const placeSlugValidator = regex(
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  "Place must contain only lowercase letters, numbers, and hyphens",
);

export const ImagesCreate = () => {
  const { data: provinces = [], isLoading: isProvincesLoading } = useGetList(
    "provinces",
    {
      pagination: { page: 1, perPage: 100 },
      sort: { field: "name", order: "ASC" },
    },
  );

  const provinceChoices = provinces.map((province: any) => ({
    id: province.url,
    name: province.name,
  }));

  return (
    <Create title="Create Image">
      <SimpleForm>
        <FileInput
          source="file"
          label="Image File"
          accept="image/*"
          validate={required()}
          maxSize={10000000}
          multiple={false}
        >
          <FileField source="src" title="title" />
        </FileInput>

        <SelectInput
          source="Province"
          choices={provinceChoices}
          optionText="name"
          optionValue="id"
          disabled={isProvincesLoading}
          helperText="Выберите провинцию"
          validate={required()}
        />

        <FormDataConsumer>
          {({ formData, ...rest }) => {
            const { data: cities = [], isLoading: isCitiesLoading } =
              useGetList("cities", {
                pagination: { page: 1, perPage: 100 },
                sort: { field: "name", order: "ASC" },
                filter: formData.Province
                  ? { province: formData.Province }
                  : {},
              });

            const cityChoices = cities.map((city: any) => ({
              id: city.url,
              name: city.name,
            }));

            return (
              <SelectInput
                source="City"
                choices={cityChoices}
                optionText="name"
                optionValue="id"
                disabled={isCitiesLoading || !formData.Province}
                helperText={
                  !formData.Province
                    ? "Сначала выберите провинцию"
                    : "Выберите город (необязательно)"
                }
              />
            );
          }}
        </FormDataConsumer>

        <FormDataConsumer>
          {({ formData, ...rest }) => {
            // Строим фильтр для places
            const placeFilter: any = {};

            // Фильтр по провинции (обязательно)
            if (formData.Province) {
              placeFilter["address.province"] = formData.Province;
            }

            // Фильтр по городу (опционально, только если выбран)
            if (formData.City) {
              placeFilter["address.city"] = formData.City;
            }

            const { data: places = [], isLoading: isPlacesLoading } =
              useGetList("places", {
                pagination: { page: 1, perPage: 100 },
                sort: { field: "name", order: "ASC" },
                filter: formData.Province ? placeFilter : {},
              });

            const placeChoices = places.map((place: any) => ({
              id: place.url,
              name: `${place.name} (${place.category || "Без категории"})`,
            }));

            return (
              <SelectInput
                source="Place"
                choices={placeChoices}
                optionText="name"
                optionValue="id"
                disabled={isPlacesLoading || !formData.Province}
                helperText={
                  !formData.Province
                    ? "Сначала выберите провинцию"
                    : formData.City
                      ? `Места в городе ${formData.City}`
                      : `Все места в провинции ${formData.Province}`
                }
                validate={required()}
              />
            );
          }}
        </FormDataConsumer>

        <TextInput
          source="ImageName"
          validate={[required(), urlSlugValidator]}
          helperText="Только строчные буквы, цифры и дефисы"
        />
      </SimpleForm>
    </Create>
  );
};
