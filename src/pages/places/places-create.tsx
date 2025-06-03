import {
  Create,
  TabbedForm,
  FormTab,
  TextInput,
  SelectInput,
  NumberInput,
  ArrayInput,
  SimpleFormIterator,
  required,
  email,
  minLength,
  maxLength,
  useGetList,
  FormDataConsumer,
} from "react-admin";
import { RichTextInput } from "ra-input-rich-text";

// Validation functions
const validateRequired = required("This field is required");
const validateEmail = email("Please enter a valid email address");
const validateUrl = (value: string) => {
  if (!value) return undefined;
  const urlPattern =
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  return urlPattern.test(value) ? undefined : "Please enter a valid URL";
};

const validateCoordinate = (value: number) => {
  if (value === undefined || value === null) return "Coordinate is required";
  if (isNaN(value)) return "Must be a valid number";
  return undefined;
};

const validateLatitude = (value: number) => {
  const coordError = validateCoordinate(value);
  if (coordError) return coordError;
  if (value < -90 || value > 90) return "Latitude must be between -90 and 90";
  return undefined;
};

const validateLongitude = (value: number) => {
  const coordError = validateCoordinate(value);
  if (coordError) return coordError;
  if (value < -180 || value > 180)
    return "Longitude must be between -180 and 180";
  return undefined;
};

export const PlacesCreate = () => {
  // Получаем список провинций из ресурса "provinces"
  const { data: provinces = [], isLoading: isProvincesLoading } = useGetList(
    "provinces",
    {
      pagination: { page: 1, perPage: 100 },
      sort: { field: "name", order: "ASC" },
    },
  );

  const provinceChoices = provinces.map((province: any) => ({
    id: province.name,
    name: province.name,
  }));

  return (
    <Create>
      <TabbedForm>
        <FormTab label="Main">
          <TextInput
            source="name"
            label="Name"
            validate={validateRequired}
            fullWidth
          />
          <SelectInput
            source="category"
            label="Category"
            choices={[
              { id: "to-eat", name: "Places to Eat" },
              { id: "adventures", name: "Adventures" },
              { id: "shops", name: "Shops" },
              { id: "services", name: "Services" },
            ]}
            validate={validateRequired}
            fullWidth
          />
          <TextInput
            source="url"
            label="URL Slug"
            validate={[validateRequired, minLength(2), maxLength(100)]}
            helperText="Unique identifier for the URL (e.g., 'my-restaurant')"
            fullWidth
          />
          <SelectInput
            source="status"
            label="Status"
            choices={[
              { id: "active", name: "Active" },
              { id: "inactive", name: "Inactive" },
              { id: "pending", name: "Pending" },
              { id: "draft", name: "Draft" },
            ]}
            defaultValue="active"
            fullWidth
          />
        </FormTab>

        <FormTab label="Description">
          <RichTextInput source="description" label="Description" fullWidth />
        </FormTab>

        <FormTab label="Address">
          <SelectInput
            source="address.country"
            label="Country"
            choices={[
              { id: "Costa Rica", name: "Costa Rica" },
              { id: "Other", name: "Other" },
            ]}
            defaultValue="Costa Rica"
            fullWidth
          />
          <SelectInput
            source="address.province"
            label="Province/State"
            choices={provinceChoices}
            disabled={isProvincesLoading}
            validate={validateRequired}
            fullWidth
          />
          <FormDataConsumer>
            {({ formData }) => {
              const province = formData.address?.province;
              const { data: cities = [], isLoading: isCitiesLoading } =
                useGetList("cities", {
                  pagination: { page: 1, perPage: 100 },
                  sort: { field: "name", order: "ASC" },
                  filter: province ? { province } : {},
                });

              const cityChoices = cities.map((city: any) => ({
                id: city.name,
                name: city.name,
              }));

              return (
                <SelectInput
                  source="address.city"
                  label="City"
                  choices={cityChoices}
                  disabled={isCitiesLoading}
                  validate={validateRequired}
                  fullWidth
                />
              );
            }}
          </FormDataConsumer>
          <TextInput source="address.street" label="Street Address" fullWidth />
        </FormTab>

        <FormTab label="Geo">
          <NumberInput
            source="latitude"
            label="Latitude"
            step={0.0000001}
            helperText="Latitude coordinate (-90 to 90)"
            fullWidth
          />
          <NumberInput
            source="longitude"
            label="Longitude"
            step={0.0000001}
            helperText="Longitude coordinate (-180 to 180)"
            fullWidth
          />
        </FormTab>

        <FormTab label="Contacts">
          <TextInput
            source="phone.callable"
            label="Phone Number"
            helperText="Main contact number"
            fullWidth
          />
          <TextInput
            source="phone.whatsapp"
            label="WhatsApp Number"
            helperText="WhatsApp contact number"
            fullWidth
          />
          <TextInput
            source="social_network.facebook"
            label="Facebook URL"
            validate={validateUrl}
            fullWidth
          />
          <TextInput
            source="social_network.instagram"
            label="Instagram URL"
            validate={validateUrl}
            fullWidth
          />
        </FormTab>

        <FormTab label="Media">
          <ArrayInput source="img_link" label="Images">
            <SimpleFormIterator>
              <TextInput
                source=""
                label="Image URL"
                validate={validateUrl}
                fullWidth
                helperText="Enter full URL to image"
              />
            </SimpleFormIterator>
          </ArrayInput>
          <TextInput
            source="preview_link"
            label="Preview Link"
            validate={validateUrl}
            fullWidth
            helperText="Link to preview the place"
          />
        </FormTab>

        <FormTab label="Tags">
          <ArrayInput source="tags" label="Tags">
            <SimpleFormIterator>
              <TextInput source="" label="Tag" fullWidth />
            </SimpleFormIterator>
          </ArrayInput>
          <ArrayInput source="keywords" label="Keywords">
            <SimpleFormIterator>
              <TextInput source="" label="Keyword" fullWidth />
            </SimpleFormIterator>
          </ArrayInput>
        </FormTab>

        <FormTab label="Schedule">
          <ArrayInput source="schedule" label="Opening Hours">
            <SimpleFormIterator>
              <ArrayInput source="days" label="Days">
                <SimpleFormIterator>
                  <SelectInput
                    source=""
                    choices={[
                      { id: "Monday", name: "Monday" },
                      { id: "Tuesday", name: "Tuesday" },
                      { id: "Wednesday", name: "Wednesday" },
                      { id: "Thursday", name: "Thursday" },
                      { id: "Friday", name: "Friday" },
                      { id: "Saturday", name: "Saturday" },
                      { id: "Sunday", name: "Sunday" },
                    ]}
                  />
                </SimpleFormIterator>
              </ArrayInput>
              <ArrayInput source="hours" label="Operating Hours">
                <SimpleFormIterator>
                  <TextInput
                    source="start"
                    label="Start Time"
                    placeholder="09:00"
                  />
                  <TextInput
                    source="end"
                    label="End Time"
                    placeholder="17:00"
                  />
                </SimpleFormIterator>
              </ArrayInput>
              <ArrayInput source="lunch" label="Lunch Break (optional)">
                <SimpleFormIterator>
                  <TextInput
                    source="start"
                    label="Lunch Start"
                    placeholder="12:00"
                  />
                  <TextInput
                    source="end"
                    label="Lunch End"
                    placeholder="13:00"
                  />
                </SimpleFormIterator>
              </ArrayInput>
            </SimpleFormIterator>
          </ArrayInput>
        </FormTab>

        <FormTab label="Services">
          <ArrayInput source="tours" label="Tours">
            <SimpleFormIterator>
              <TextInput source="title" label="Tour Title" fullWidth />
              <TextInput source="name" label="Tour Name" fullWidth />
              <TextInput source="price" label="Price" fullWidth />
              <TextInput source="time" label="Duration" fullWidth />
              <TextInput
                source="image"
                label="Tour Image URL"
                validate={validateUrl}
                fullWidth
              />
            </SimpleFormIterator>
          </ArrayInput>
        </FormTab>

        <FormTab label="VIP">
          <TextInput
            source="social_network.vip"
            label="VIP URL"
            validate={validateUrl}
            fullWidth
          />
          <TextInput source="owner.name" label="Owner Name" fullWidth />
          <TextInput source="owner.phone" label="Owner Phone" fullWidth />
          <TextInput
            source="vipEmail"
            label="VIP Email"
            validate={validateEmail}
            fullWidth
          />
          <TextInput source="vip_service.header" label="VIP Header" fullWidth />
          <TextInput
            source="vip_service.button"
            label="VIP Button Text"
            fullWidth
          />
          <TextInput
            source="vip_service_description.header"
            label="Description Header"
            fullWidth
          />
          <TextInput
            source="vip_service_description.button"
            label="Description Button"
            fullWidth
          />
          <TextInput
            source="vip_service_description.image"
            label="Description Image URL"
            validate={validateUrl}
            fullWidth
          />
          <ArrayInput
            source="vip_service_description.description"
            label="Description Points"
          >
            <SimpleFormIterator>
              <TextInput source="" label="Description Point" fullWidth />
            </SimpleFormIterator>
          </ArrayInput>
          <TextInput
            source="about_client.header"
            label="About Header"
            fullWidth
          />
          <TextInput
            source="about_client.img"
            label="About Image URL"
            validate={validateUrl}
            fullWidth
          />
          <ArrayInput
            source="about_client.description"
            label="About Description"
          >
            <SimpleFormIterator>
              <TextInput source="" label="Description Point" fullWidth />
            </SimpleFormIterator>
          </ArrayInput>
          <TextInput
            source="why_client_section.header"
            label="Section Header"
            fullWidth
          />
          <ArrayInput source="why_client_section.data" label="Reasons">
            <SimpleFormIterator>
              <TextInput source="num" label="Number/Order" />
              <TextInput source="header" label="Title" fullWidth />
              <TextInput
                source="description"
                label="Description"
                fullWidth
                multiline
              />
            </SimpleFormIterator>
          </ArrayInput>
          <TextInput
            source="additional_information.header"
            label="Info Header"
            fullWidth
          />
          <ArrayInput
            source="additional_information.data"
            label="Information Items"
          >
            <SimpleFormIterator>
              <TextInput source="icon" label="Icon" />
              <TextInput source="header" label="Title" fullWidth />
              <TextInput
                source="description"
                label="Description"
                fullWidth
                multiline
              />
            </SimpleFormIterator>
          </ArrayInput>
        </FormTab>
      </TabbedForm>
    </Create>
  );
};

export default PlacesCreate;
