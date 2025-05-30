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
} from "react-admin";

const urlSlugValidator = regex(
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  "Image Name must contain only lowercase letters, numbers, and hyphens"
);

const placeSlugValidator = regex(
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  "Place must contain only lowercase letters, numbers, and hyphens"
);

export const ImagesCreate = () => {
  // Получаем список провинций
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

  // Получаем все города без фильтрации по провинции
  const { data: cities = [], isLoading: isCitiesLoading } = useGetList(
    "cities",
    {
      pagination: { page: 1, perPage: 100 },
      sort: { field: "name", order: "ASC" },
    },
  );

  const cityChoices = cities.map((city: any) => ({
    id: city.url,
    name: city.name,
  }));

  return (
    <Create title="Create Image">
      <SimpleForm>
        <FileInput
          source="file"
          label="Image File"
          accept="image/*"
          validate={required()}
          maxSize={10000000} // 10MB максимум
          multiple={false}
        >
          <FileField source="src" title="title" />
        </FileInput>
        <SelectInput
          source="Province"
          label="Province"
          choices={provinceChoices}
          optionText="name"
          optionValue="id"
          disabled={isProvincesLoading}
          helperText="Выберите провинцию"
        />
        <SelectInput
          source="City"
          label="City"
          choices={cityChoices}
          optionText="name"
          optionValue="id"
          disabled={isCitiesLoading}
          helperText="Выберите город"
        />
        <TextInput
          source="Place"
          label="Place"
          helperText="Название места (только строчные буквы, цифры и дефисы)"
          validate={placeSlugValidator}
        />
        <TextInput
          source="ImageName"
          label="Image Name (URL part)"
          validate={[required(), urlSlugValidator]}
          helperText="Только строчные буквы, цифры и дефисы"
        />
      </SimpleForm>
    </Create>
  );
};
