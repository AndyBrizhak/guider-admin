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

export const ImagesShow = () => (
  <Show>
    <TabbedShowLayout>
      <Tab label="General">
        <TextField source="ImageName" label="Image Name" />
        <TextField source="Place" label="Place" />
        <TextField source="City" label="City" />
        <TextField source="Province" label="Province" />
        {/* <TextField source="FilePath" label="File Path" /> */}
        <FunctionField
          label="Image URL"
          render={(record: any) => {
            // Удаляем ведущий слэш, если он есть, чтобы не было двойных слэшей
            const cleanPath = record.FilePath
              ? record.FilePath.replace(/^\/+/, "")
              : "";
            const imageUrl = cleanPath ? `${API_URL}/images/${cleanPath}` : "";

            return imageUrl ? (
              <div>
                <div style={{ marginBottom: "10px" }}>
                  {/* <strong>Full URL:</strong>{" "} */}
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
                </div>
                {/* <div style={{ marginBottom: "10px" }}>
                  <strong>File Path:</strong> {record.FilePath}
                </div> */}
                {/* <div style={{ marginBottom: "10px" }}>
                  <strong>API URL:</strong> {API_URL}
                </div> */}
                <div>
                  <strong>Preview:</strong>
                  <br />
                  <img
                    src={imageUrl}
                    alt={record.ImageName || "Image"}
                    style={{
                      maxWidth: "300px",
                      maxHeight: "200px",
                      marginTop: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                    }}
                    onLoad={() =>
                      console.log("Image loaded successfully:", imageUrl)
                    }
                    onError={(e) => {
                      console.error("Image failed to load:", imageUrl);
                      console.error("Error event:", e);
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              </div>
            ) : (
              "No image available"
            );
          }}
        />
      </Tab>
      <Tab label="Details">
        <TextField source="OriginalFileName" label="Original File Name" />
        <NumberField source="FileSize" label="File Size (bytes)" />
        <TextField source="ContentType" label="Content Type" />
        <TextField source="Extension" label="Extension" />
        <DateField source="UploadDate.$date" label="Upload Date" showTime />
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export default ImagesShow;
