import {
  Show,
  TabbedShowLayout,
  Tab,
  TextField,
  NumberField,
  DateField,
  FunctionField,
} from "react-admin";

const API_URL = import.meta.env.VITE_API_URL || "https://localhost:7001";

const ImagePreview = ({ record }: { record: any }) => {
  const cleanPath = record?.FilePath ? record.FilePath.replace(/^\/+/, "") : "";
  const imageUrl = cleanPath ? `${API_URL}/images/${cleanPath}` : "";
  return imageUrl ? (
    <img
      src={imageUrl}
      alt={record.ImageName || "Image"}
      style={{
        maxWidth: "300px",
        maxHeight: "200px",
        border: "1px solid #ddd",
        borderRadius: "4px",
      }}
    />
  ) : (
    <div
      style={{
        width: "300px",
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
      No preview
    </div>
  );
};

export const ImagesShow = () => (
  <Show>
    <TabbedShowLayout>
      <Tab label="General">
        <div style={{ display: "flex", alignItems: "flex-start", gap: 32 }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <TextField source="ImageName" label="Image Name" />
            <FunctionField
              label="Place"
              render={(record: any) => (record.Place ? record.Place : "")}
            />
            <FunctionField
              label="City"
              render={(record: any) => (record.City ? record.City : "")}
            />
            <FunctionField
              label="Province"
              render={(record: any) => (record.Province ? record.Province : "")}
            />
            <FunctionField
              label="Image URL"
              render={(record: any) => {
                const cleanPath = record.FilePath
                  ? record.FilePath.replace(/^\/+/, "")
                  : "";
                const imageUrl = cleanPath
                  ? `${API_URL}/images/${cleanPath}`
                  : "";
                return imageUrl ? (
                  <a
                    href={imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#1976d2",
                      textDecoration: "underline",
                      wordBreak: "break-all",
                    }}
                  >
                    {imageUrl}
                  </a>
                ) : (
                  "No image available"
                );
              }}
            />
          </div>
          <div style={{ minWidth: 320, textAlign: "center" }}>
            <FunctionField
              label=""
              render={(record: any) => <ImagePreview record={record} />}
            />
          </div>
        </div>
      </Tab>
      <Tab label="Details">
        <div style={{ display: "flex", alignItems: "flex-start", gap: 32 }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <TextField source="OriginalFileName" label="Original File Name" />
            <NumberField source="FileSize" label="File Size (bytes)" />
            <TextField source="ContentType" label="Content Type" />
            <TextField source="Extension" label="Extension" />
            <DateField source="UploadDate.$date" label="Upload Date" showTime />
          </div>
          <div style={{ minWidth: 320, textAlign: "center" }}>
            <FunctionField
              label=""
              render={(record: any) => <ImagePreview record={record} />}
            />
          </div>
        </div>
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export default ImagesShow;
