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
} from "react-admin";

export const ImagesCreate = () => {
  // Получаем список провинций
  const { data: provinces = [], isLoading: isProvincesLoading } = useGetList(
    "provinces",
    {
      pagination: { page: 1, perPage: 100 },
      sort: { field: "name", order: "ASC" },
    },
  );

  // Формируем список для SelectInput: label — name, value — url
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

  // Формируем список для SelectInput: label — name, value — url
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
        <TextInput source="Place" label="Place" helperText="Название места" />
        <TextInput
          source="ImageName"
          label="Image Name"
          validate={required()}
          helperText="Имя файла (можно без расширения)"
        />
      </SimpleForm>
    </Create>
  );
};
