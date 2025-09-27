import { createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  abstractUploader: f({ 
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { maxFileSize: "4MB" },
    "application/msword": { maxFileSize: "4MB" }
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      console.log("Abstract uploader middleware called");
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { uploadedBy: "user" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Abstract upload complete for userId:", metadata.uploadedBy);
      console.log("Abstract file url:", file.url || file.ufsUrl);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { 
        uploadedBy: metadata.uploadedBy,
        fileUrl: file.url || file.ufsUrl,
        fileName: file.name
      };
    }),
    
  paperUploader: f({ 
    "application/pdf": { maxFileSize: "8MB" },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { maxFileSize: "8MB" },
    "application/msword": { maxFileSize: "8MB" }
  })
    .middleware(async ({ req }) => {
      console.log("Paper uploader middleware called");
      return { uploadedBy: "user" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Paper upload complete for userId:", metadata.uploadedBy);
      console.log("Paper file url:", file.url || file.ufsUrl);
      return { 
        uploadedBy: metadata.uploadedBy,
        fileUrl: file.url || file.ufsUrl,
        fileName: file.name
      };
    }),
};