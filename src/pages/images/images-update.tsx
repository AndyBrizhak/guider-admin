/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */

import {
  Edit,
  SimpleForm,
  TextInput,
  FileInput,
  FileField,
  SelectInput,
  AutocompleteInput,
  useGetList,
  regex,
  FormDataConsumer,
  useRecordContext,
} from "react-admin";

const urlSlugValidator = regex(
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  "Image Name must contain only lowercase letters, numbers, and hyphens",
);

export const ImagesUpdate = () => {
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

  const transform = (data: any) => {
    // Преобразуем данные для совместимости с API
    const transformedData: any = {};

    // Если есть новый файл изображения
    if (data.newImageFile) {
      transformedData.newImageFile = data.newImageFile;
    }

    // Остальные поля переименовываем согласно API
    if (data.newImageName !== undefined) {
      transformedData.newImageName = data.newImageName;
    }
    if (data.Province !== undefined) {
      transformedData.province = data.Province;
    }
    if (data.City !== undefined) {
      transformedData.city = data.City;
    }
    if (data.Place !== undefined) {
      transformedData.place = data.Place;
    }
    if (data.description !== undefined) {
      transformedData.description = data.description;
    }
    if (data.tags !== undefined) {
      transformedData.tags = data.tags;
    }

    return transformedData;
  };

  return (
    <Edit title="Update Image" transform={transform}>
      <SimpleForm>
        <FileInput
          source="newImageFile"
          label="New Image File (Optional)"
          accept="image/*"
          maxSize={10000000}
          multiple={false}
          helperText="Оставьте пустым, если не хотите менять изображение"
        >
          <FileField source="src" title="title" />
        </FileInput>

        <TextInput
          source="newImageName"
          label="New Image Name (Optional)"
          validate={urlSlugValidator}
          helperText="Только строчные буквы, цифры и дефисы. Оставьте пустым, если не хотите менять название"
        />

        <AutocompleteInput
          source="Province"
          label="Province"
          choices={provinceChoices}
          optionText="name"
          optionValue="id"
          disabled={isProvincesLoading}
          helperText="Выберите провинцию (необязательно)"
          filterToQuery={(searchText) => ({ q: searchText })}
          noOptionsText="Провинции не найдены"
          loadingText="Загрузка провинций..."
          allowEmpty
        />

        <FormDataConsumer>
          {({ formData, ...rest }) => {
            const record = useRecordContext();

            // Используем провинцию из формы или из текущей записи
            const selectedProvince = formData.Province || record?.province;

            const { data: cities = [], isLoading: isCitiesLoading } =
              useGetList("cities", {
                pagination: { page: 1, perPage: 1000000 },
                sort: { field: "name", order: "ASC" },
                filter: selectedProvince ? { province: selectedProvince } : {},
              });

            const cityChoices = cities.map((city: any) => ({
              id: city.url,
              name: city.name,
            }));

            return (
              <AutocompleteInput
                source="City"
                label="City"
                choices={cityChoices}
                optionText="name"
                optionValue="id"
                disabled={isCitiesLoading || !selectedProvince}
                helperText={
                  !selectedProvince
                    ? "Сначала выберите провинцию для выбора города"
                    : "Выберите город (необязательно)"
                }
                filterToQuery={(searchText) => ({ q: searchText })}
                noOptionsText="Города не найдены"
                loadingText="Загрузка городов..."
                allowEmpty
              />
            );
          }}
        </FormDataConsumer>

        <FormDataConsumer>
          {({ formData, ...rest }) => {
            const record = useRecordContext();

            // Используем данные из формы или из текущей записи
            const selectedProvince = formData.Province || record?.province;
            const selectedCity = formData.City || record?.city;

            // Строим фильтр для places
            const placeFilter: any = {};

            // Фильтр по провинции (только если выбрана)
            if (selectedProvince) {
              placeFilter["address.province"] = selectedProvince;
            }

            // Фильтр по городу (опционально, только если выбран)
            if (selectedCity) {
              placeFilter["address.city"] = selectedCity;
            }

            const { data: places = [], isLoading: isPlacesLoading } =
              useGetList("places", {
                pagination: { page: 1, perPage: 1000000 },
                sort: { field: "name", order: "ASC" },
                filter: selectedProvince ? placeFilter : {},
              });

            const placeChoices = places.map((place: any) => ({
              id: place.url,
              name: `${place.name} (${place.category || "Без категории"})`,
            }));

            return (
              <AutocompleteInput
                source="Place"
                label="Place"
                choices={placeChoices}
                optionText="name"
                optionValue="id"
                disabled={isPlacesLoading || !selectedProvince}
                helperText={
                  !selectedProvince
                    ? "Сначала выберите провинцию для выбора заведения"
                    : selectedCity
                      ? `Заведения в городе ${selectedCity} (необязательно)`
                      : `Заведения в провинции ${selectedProvince} (необязательно)`
                }
                filterToQuery={(searchText) => ({ q: searchText })}
                noOptionsText="Заведения не найдены"
                loadingText="Загрузка заведений..."
                allowEmpty
              />
            );
          }}
        </FormDataConsumer>

        <TextInput
          source="description"
          label="Description"
          multiline
          rows={3}
          helperText="Описание изображения (необязательно)"
        />

        <TextInput
          source="tags"
          label="Tags"
          helperText="Теги через запятую (необязательно)"
        />
      </SimpleForm>
    </Edit>
  );
};
