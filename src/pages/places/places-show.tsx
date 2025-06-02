import {
  Show,
  TabbedShowLayout,
  Tab,
  TextField,
  NumberField,
  DateField,
  FunctionField,
  ArrayField,
  Datagrid,
  ChipField,
  SingleFieldList,
} from "react-admin";

const API_URL = import.meta.env.VITE_API_URL || "https://localhost:7001";

// Компонент для предварительного просмотра изображений
const ImageGallery = ({ record }: { record: any }) => {
  const images = record?.img_link || [];

  if (!images.length) {
    return (
      <div
        style={{
          width: "100%",
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f5f5",
          color: "#aaa",
          border: "1px solid #ddd",
          borderRadius: "4px",
        }}
      >
        No images available
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {images.slice(0, 3).map((imageUrl: string, index: number) => (
        <div key={index} style={{ textAlign: "center" }}>
          <img
            src={imageUrl}
            alt={`${record.name || "Place"} - Image ${index + 1}`}
            style={{
              maxWidth: "300px",
              maxHeight: "200px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              objectFit: "cover",
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
            Image {index + 1}
          </div>
        </div>
      ))}
      {images.length > 3 && (
        <div style={{ textAlign: "center", color: "#666", fontSize: "14px" }}>
          +{images.length - 3} more images
        </div>
      )}
    </div>
  );
};

// Компонент для отображения расписания
const ScheduleDisplay = ({ record }: { record: any }) => {
  const schedule = record?.schedule || [];

  if (!schedule.length) {
    return <span>No schedule available</span>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {schedule.map((item: any, index: number) => (
        <div
          key={index}
          style={{
            padding: "8px",
            border: "1px solid #eee",
            borderRadius: "4px",
          }}
        >
          <div style={{ fontWeight: "500", marginBottom: "4px" }}>
            {item.days?.join(", ") || "No days specified"}
          </div>
          {item.hours && item.hours.length > 0 && (
            <div style={{ fontSize: "14px", color: "#666" }}>
              Hours:{" "}
              {item.hours.map((h: any) => `${h.start} - ${h.end}`).join(", ")}
            </div>
          )}
          {item.lunch && item.lunch.length > 0 && (
            <div style={{ fontSize: "14px", color: "#666" }}>
              Lunch:{" "}
              {item.lunch.map((l: any) => `${l.start} - ${l.end}`).join(", ")}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Компонент для отображения координат
const LocationDisplay = ({ record }: { record: any }) => {
  const location = record?.location;

  if (!location?.coordinates) {
    return <span>No coordinates available</span>;
  }

  const [lng, lat] = location.coordinates;
  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <div>Type: {location.type || "Point"}</div>
      <div>
        Coordinates: [{lng}, {lat}]
      </div>
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#1976d2", textDecoration: "underline" }}
      >
        View on Google Maps
      </a>
    </div>
  );
};

// Компонент для отображения контактной информации
const ContactDisplay = ({ record }: { record: any }) => {
  const phone = record?.phone;
  const social = record?.social_network;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {phone?.callable && (
        <div>
          <strong>Phone:</strong> {phone.callable}
        </div>
      )}
      {phone?.whatsapp && (
        <div>
          <strong>WhatsApp:</strong> {phone.whatsapp}
        </div>
      )}
      {social?.facebook && (
        <div>
          <strong>Facebook:</strong>{" "}
          <a
            href={social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1976d2" }}
          >
            {social.facebook}
          </a>
        </div>
      )}
      {social?.instagram && (
        <div>
          <strong>Instagram:</strong>{" "}
          <a
            href={social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1976d2" }}
          >
            {social.instagram}
          </a>
        </div>
      )}
      {social?.vip && (
        <div>
          <strong>VIP:</strong>{" "}
          <a
            href={social.vip}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1976d2" }}
          >
            {social.vip}
          </a>
        </div>
      )}
    </div>
  );
};

// Компонент для отображения HTML описания
const DescriptionDisplay = ({ record }: { record: any }) => {
  const description = record?.description;

  if (!description) {
    return <span>No description available</span>;
  }

  if (Array.isArray(description)) {
    return (
      <div>
        {description.map((desc: string, index: number) => (
          <div key={index} style={{ marginBottom: "8px" }}>
            <div dangerouslySetInnerHTML={{ __html: desc }} />
          </div>
        ))}
      </div>
    );
  }

  return <div dangerouslySetInnerHTML={{ __html: description }} />;
};

export const PlacesShow = () => (
  <Show>
    <TabbedShowLayout>
      <Tab label="General">
        <div style={{ display: "flex", alignItems: "flex-start", gap: 32 }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ minWidth: 120, fontWeight: 500 }}>ID:</span>
              <TextField source="id" label={false} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ minWidth: 120, fontWeight: 500 }}>Name:</span>
              <TextField source="name" label={false} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ minWidth: 120, fontWeight: 500 }}>Category:</span>
              <TextField source="category" label={false} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ minWidth: 120, fontWeight: 500 }}>URL:</span>
              <TextField source="url" label={false} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ minWidth: 120, fontWeight: 500 }}>Status:</span>
              <TextField source="status" label={false} />
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <span style={{ minWidth: 120, fontWeight: 500, paddingTop: 4 }}>
                Address:
              </span>
              <FunctionField
                label={false}
                render={(record: any) => {
                  const addr = record.address;
                  if (!addr) return "No address available";
                  return (
                    <div>
                      <div>{addr.street}</div>
                      <div>
                        {addr.city}, {addr.province}
                      </div>
                      <div>{addr.country}</div>
                    </div>
                  );
                }}
              />
            </div>
          </div>
          <div style={{ minWidth: 320, textAlign: "center" }}>
            <FunctionField
              label=""
              render={(record: any) => <ImageGallery record={record} />}
            />
          </div>
        </div>
      </Tab>

      <Tab label="Description & Tags">
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <h3 style={{ marginBottom: "12px", color: "#333" }}>Description</h3>
            <FunctionField
              label={false}
              render={(record: any) => <DescriptionDisplay record={record} />}
            />
          </div>

          <div>
            <h3 style={{ marginBottom: "12px", color: "#333" }}>Tags</h3>
            <FunctionField
              label={false}
              render={(record: any) => {
                const tags = record?.tags;
                if (!tags || !tags.length || (tags.length === 1 && !tags[0])) {
                  return <span>No tags available</span>;
                }
                return (
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
                  >
                    {tags
                      .filter((tag: string) => tag && tag.trim())
                      .map((tag: string, index: number) => (
                        <span
                          key={index}
                          style={{
                            background: "#e3f2fd",
                            color: "#1976d2",
                            padding: "4px 8px",
                            borderRadius: "16px",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                );
              }}
            />
          </div>

          <div>
            <h3 style={{ marginBottom: "12px", color: "#333" }}>Keywords</h3>
            <FunctionField
              label={false}
              render={(record: any) => {
                const keywords = record?.keywords;
                if (
                  !keywords ||
                  !keywords.length ||
                  (keywords.length === 1 && !keywords[0])
                ) {
                  return <span>No keywords available</span>;
                }
                return (
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
                  >
                    {keywords
                      .filter((keyword: string) => keyword && keyword.trim())
                      .map((keyword: string, index: number) => (
                        <span
                          key={index}
                          style={{
                            background: "#f3e5f5",
                            color: "#7b1fa2",
                            padding: "4px 8px",
                            borderRadius: "16px",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          {keyword}
                        </span>
                      ))}
                  </div>
                );
              }}
            />
          </div>
        </div>
      </Tab>

      <Tab label="Contact & Location">
        <div style={{ display: "flex", alignItems: "flex-start", gap: 32 }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ marginBottom: "12px", color: "#333" }}>
              Contact Information
            </h3>
            <FunctionField
              label={false}
              render={(record: any) => <ContactDisplay record={record} />}
            />

            {/* Owner information */}
            <div style={{ marginTop: "24px" }}>
              <h3 style={{ marginBottom: "12px", color: "#333" }}>
                Owner Information
              </h3>
              <FunctionField
                label={false}
                render={(record: any) => {
                  const owner = record?.owner;
                  if (!owner)
                    return <span>No owner information available</span>;

                  if (Array.isArray(owner)) {
                    return (
                      <div>
                        {owner.map((o: any, index: number) => (
                          <div key={index} style={{ marginBottom: "8px" }}>
                            <div>
                              <strong>Name:</strong> {o.name || "Not specified"}
                            </div>
                            <div>
                              <strong>Phone:</strong>{" "}
                              {o.phone || "Not specified"}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  }

                  return (
                    <div>
                      <div>
                        <strong>Name:</strong> {owner.name || "Not specified"}
                      </div>
                      <div>
                        <strong>Phone:</strong> {owner.phone || "Not specified"}
                      </div>
                    </div>
                  );
                }}
              />
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <h3 style={{ marginBottom: "12px", color: "#333" }}>Location</h3>
            <FunctionField
              label={false}
              render={(record: any) => <LocationDisplay record={record} />}
            />
          </div>
        </div>
      </Tab>

      <Tab label="Schedule & Services">
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <h3 style={{ marginBottom: "12px", color: "#333" }}>Schedule</h3>
            <FunctionField
              label={false}
              render={(record: any) => <ScheduleDisplay record={record} />}
            />
          </div>

          {/* Tours if available */}
          <div>
            <h3 style={{ marginBottom: "12px", color: "#333" }}>Tours</h3>
            <FunctionField
              label={false}
              render={(record: any) => {
                const tours = record?.tours;
                if (!tours || !tours.length) {
                  return <span>No tours available</span>;
                }

                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {tours.map((tour: any, index: number) => (
                      <div
                        key={index}
                        style={{
                          padding: "12px",
                          border: "1px solid #eee",
                          borderRadius: "4px",
                        }}
                      >
                        <div style={{ fontWeight: "500", marginBottom: "8px" }}>
                          {tour.title}
                        </div>
                        <div style={{ marginBottom: "4px" }}>
                          <strong>Name:</strong> {tour.name}
                        </div>
                        <div style={{ marginBottom: "4px" }}>
                          <strong>Price:</strong> {tour.price}
                        </div>
                        <div style={{ marginBottom: "4px" }}>
                          <strong>Time:</strong> {tour.time}
                        </div>
                        {tour.image && (
                          <img
                            src={tour.image}
                            alt={tour.name}
                            style={{
                              maxWidth: "200px",
                              maxHeight: "120px",
                              marginTop: "8px",
                              border: "1px solid #ddd",
                              borderRadius: "4px",
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                );
              }}
            />
          </div>

          {/* VIP Services */}
          <div>
            <h3 style={{ marginBottom: "12px", color: "#333" }}>
              VIP Services
            </h3>
            <FunctionField
              label={false}
              render={(record: any) => {
                const vipService = record?.vip_service;
                const vipDescription = record?.vip_service_description;
                const vipEmail = record?.vipEmail;

                if (!vipService && !vipDescription && !vipEmail) {
                  return <span>No VIP services available</span>;
                }

                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {vipService && (
                      <div>
                        <div>
                          <strong>Header:</strong> {vipService.header}
                        </div>
                        <div>
                          <strong>Button:</strong> {vipService.button}
                        </div>
                      </div>
                    )}
                    {vipDescription && (
                      <div>
                        <div>
                          <strong>Header:</strong> {vipDescription.header}
                        </div>
                        <div>
                          <strong>Description:</strong>
                        </div>
                        {vipDescription.description?.map(
                          (desc: string, index: number) => (
                            <div
                              key={index}
                              style={{
                                marginLeft: "16px",
                                marginBottom: "4px",
                              }}
                            >
                              • {desc}
                            </div>
                          ),
                        )}
                        <div>
                          <strong>Button:</strong> {vipDescription.button}
                        </div>
                        {vipDescription.image && (
                          <img
                            src={vipDescription.image}
                            alt="VIP Service"
                            style={{
                              maxWidth: "200px",
                              maxHeight: "120px",
                              marginTop: "8px",
                              border: "1px solid #ddd",
                              borderRadius: "4px",
                            }}
                          />
                        )}
                      </div>
                    )}
                    {vipEmail && (
                      <div>
                        <strong>VIP Email:</strong>
                        <a
                          href={`mailto:${vipEmail}`}
                          style={{ color: "#1976d2", marginLeft: "8px" }}
                        >
                          {vipEmail}
                        </a>
                      </div>
                    )}
                  </div>
                );
              }}
            />
          </div>
        </div>
      </Tab>

      <Tab label="Additional Info">
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* About Client */}
          <div>
            <h3 style={{ marginBottom: "12px", color: "#333" }}>
              About Client
            </h3>
            <FunctionField
              label={false}
              render={(record: any) => {
                const aboutClient = record?.about_client;
                if (!aboutClient) return <span>No information available</span>;

                return (
                  <div>
                    <div style={{ marginBottom: "8px" }}>
                      <strong>{aboutClient.header}</strong>
                    </div>
                    {aboutClient.description?.map(
                      (desc: string, index: number) => (
                        <div key={index} style={{ marginBottom: "4px" }}>
                          • {desc}
                        </div>
                      ),
                    )}
                    {aboutClient.img && (
                      <img
                        src={aboutClient.img}
                        alt="About Client"
                        style={{
                          maxWidth: "200px",
                          maxHeight: "120px",
                          marginTop: "8px",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                        }}
                      />
                    )}
                  </div>
                );
              }}
            />
          </div>

          {/* Why Client Section */}
          <div>
            <h3 style={{ marginBottom: "12px", color: "#333" }}>
              Why Choose Us
            </h3>
            <FunctionField
              label={false}
              render={(record: any) => {
                const whyClient = record?.why_client_section;
                if (!whyClient) return <span>No information available</span>;

                return (
                  <div>
                    <div style={{ marginBottom: "12px", fontWeight: "500" }}>
                      {whyClient.header}
                    </div>
                    {whyClient.data?.map((item: any, index: number) => (
                      <div
                        key={index}
                        style={{
                          padding: "8px",
                          border: "1px solid #eee",
                          borderRadius: "4px",
                          marginBottom: "8px",
                        }}
                      >
                        <div style={{ fontWeight: "500", color: "#1976d2" }}>
                          {item.num}
                        </div>
                        <div style={{ fontWeight: "500" }}>{item.header}</div>
                        <div style={{ fontSize: "14px", color: "#666" }}>
                          {item.description}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }}
            />
          </div>

          {/* Additional Information */}
          <div>
            <h3 style={{ marginBottom: "12px", color: "#333" }}>
              Additional Information
            </h3>
            <FunctionField
              label={false}
              render={(record: any) => {
                const additionalInfo = record?.additional_information;
                if (!additionalInfo)
                  return <span>No additional information available</span>;

                return (
                  <div>
                    <div style={{ marginBottom: "12px", fontWeight: "500" }}>
                      {additionalInfo.header}
                    </div>
                    {additionalInfo.data?.map((item: any, index: number) => (
                      <div
                        key={index}
                        style={{
                          padding: "8px",
                          border: "1px solid #eee",
                          borderRadius: "4px",
                          marginBottom: "8px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          {item.icon && <span>{item.icon}</span>}
                          <div>
                            <div style={{ fontWeight: "500" }}>
                              {item.header}
                            </div>
                            <div style={{ fontSize: "14px", color: "#666" }}>
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }}
            />
          </div>

          {/* Preview Link */}
          <div>
            <h3 style={{ marginBottom: "12px", color: "#333" }}>Preview</h3>
            <FunctionField
              label={false}
              render={(record: any) => {
                const previewLink = record?.preview_link;
                if (!previewLink) return <span>No preview available</span>;

                return (
                  <a
                    href={previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#1976d2", textDecoration: "underline" }}
                  >
                    {previewLink}
                  </a>
                );
              }}
            />
          </div>
        </div>
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export default PlacesShow;
