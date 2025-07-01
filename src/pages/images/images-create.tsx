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
  AutocompleteInput,
  useGetList,
  regex,
  FormDataConsumer,
} from "react-admin";

const urlSlugValidator = regex(
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  "Image Name must contain only lowercase letters, numbers, and hyphens",
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
    <Create title="Create Image" redirect="show">
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

        <AutocompleteInput
          source="Province"
          choices={provinceChoices}
          optionText="name"
          optionValue="id"
          disabled={isProvincesLoading}
          helperText="Выберите провинцию (необязательно)"
          filterToQuery={(searchText) => ({ q: searchText })}
          noOptionsText="Провинции не найдены"
          loadingText="Загрузка провинций..."
        />

        <FormDataConsumer>
          {({ formData, ...rest }) => {
            const { data: cities = [], isLoading: isCitiesLoading } =
              useGetList("cities", {
                pagination: { page: 1, perPage: 1000000 },
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
              <AutocompleteInput
                source="City"
                choices={cityChoices}
                optionText="name"
                optionValue="id"
                disabled={isCitiesLoading || !formData.Province}
                helperText={
                  !formData.Province
                    ? "Сначала выберите провинцию для выбора города"
                    : "Выберите город (необязательно)"
                }
                filterToQuery={(searchText) => ({ q: searchText })}
                noOptionsText="Города не найдены"
                loadingText="Загрузка городов..."
              />
            );
          }}
        </FormDataConsumer>

        <FormDataConsumer>
          {({ formData, ...rest }) => {
            // Строим фильтр для places
            const placeFilter: any = {};

            // Фильтр по провинции (только если выбрана)
            if (formData.Province) {
              placeFilter["address.province"] = formData.Province;
            }

            // Фильтр по городу (опционально, только если выбран)
            if (formData.City) {
              placeFilter["address.city"] = formData.City;
            }

            const { data: places = [], isLoading: isPlacesLoading } =
              useGetList("places", {
                pagination: { page: 1, perPage: 1000000 },
                sort: { field: "name", order: "ASC" },
                filter: formData.Province ? placeFilter : {},
              });

            const placeChoices = places.map((place: any) => ({
              id: place.url,
              name: `${place.name} (${place.category || "Без категории"})`,
            }));

            return (
              <AutocompleteInput
                source="Place"
                choices={placeChoices}
                optionText="name"
                optionValue="id"
                disabled={isPlacesLoading || !formData.Province}
                helperText={
                  !formData.Province
                    ? "Сначала выберите провинцию для выбора заведения"
                    : formData.City
                      ? `Заведения в городе ${formData.City} (необязательно)`
                      : `Заведения в провинции ${formData.Province} (необязательно)`
                }
                filterToQuery={(searchText) => ({ q: searchText })}
                noOptionsText="Заведения не найдены"
                loadingText="Загрузка заведений..."
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
