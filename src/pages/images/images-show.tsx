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
              gap: 12,
            }}
          >
            {/* General fields with labels on the left and values on the right */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ minWidth: 120, fontWeight: 500 }}>
                Image Name:
              </span>
              <TextField source="ImageName" label={false} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ minWidth: 120, fontWeight: 500 }}>Place:</span>
              <FunctionField
                label={false}
                render={(record: any) => (record.Place ? record.Place : "")}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ minWidth: 120, fontWeight: 500 }}>City:</span>
              <FunctionField
                label={false}
                render={(record: any) => (record.City ? record.City : "")}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ minWidth: 120, fontWeight: 500 }}>Province:</span>
              <FunctionField
                label={false}
                render={(record: any) =>
                  record.Province ? record.Province : ""
                }
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ minWidth: 120, fontWeight: 500 }}>Image URL:</span>
              <FunctionField
                label={false}
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
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ minWidth: 140, fontWeight: 500 }}>
                Original File Name:
              </span>
              <TextField source="OriginalFileName" label={false} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ minWidth: 140, fontWeight: 500 }}>
                File Size (bytes):
              </span>
              <NumberField source="FileSize" label={false} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ minWidth: 140, fontWeight: 500 }}>
                Content Type:
              </span>
              <TextField source="ContentType" label={false} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ minWidth: 140, fontWeight: 500 }}>Extension:</span>
              <TextField source="Extension" label={false} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ minWidth: 140, fontWeight: 500 }}>
                Upload Date:
              </span>
              <DateField source="UploadDate.$date" label={false} showTime />
            </div>
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
