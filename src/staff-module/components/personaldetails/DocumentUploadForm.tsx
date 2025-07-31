import React, { useState } from "react";
import { supabase } from "../../../supabaseClient";

interface Document {
  name: string;
  url?: string;
}

interface Props {
  formData: { documents: Document[] };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const DocumentUploadForm: React.FC<Props> = ({ formData, setFormData }) => {
  const [newDocName, setNewDocName] = useState("");
  const [newDocFile, setNewDocFile] = useState<File | null>(null);

  // ✅ Upload file immediately and update DB + state
  const handleAddDocument = async () => {
    if (!newDocName || !newDocFile) return;

    try {
      // Upload file to Supabase Storage
      const sanitizedName = newDocFile.name.replace(/\s+/g, "_");
      const path = `documents/${Date.now()}_${sanitizedName}`;

      const { error } = await supabase.storage
        .from("usersdocuments")
        .upload(path, newDocFile, { cacheControl: "3600", upsert: true });

      if (error) throw error;

      const { data } = supabase.storage
        .from("usersdocuments")
        .getPublicUrl(path);

      const newDoc = { name: newDocName, url: data.publicUrl };

      // Update local state
      setFormData((prev: any) => ({
        ...prev,
        documents: [...(prev.documents || []), newDoc],
      }));

      // Update Supabase DB
      const { data: authUser } = await supabase.auth.getUser();
      const userId = authUser?.user?.id;

      if (userId) {
        await supabase
          .from("personal_details")
          .update({
            documents: [...(formData.documents || []), newDoc],
          })
          .eq("id", userId);
      }

      setNewDocName("");
      setNewDocFile(null);
    } catch (err) {
      console.error("Upload Error:", err);
      alert("Failed to upload document.");
    }
  };

  // ✅ Delete file from storage + DB + UI
  const handleDeleteDocument = async (doc: Document) => {
    if (!doc.url) return;

    try {
      const filePath = decodeURIComponent(
        doc.url.split("/storage/v1/object/public/usersdocuments/")[1]
      );

      // Remove from storage
      await supabase.storage.from("usersdocuments").remove([filePath]);

      // Update local state
      const updatedDocs = formData.documents.filter((d) => d.url !== doc.url);
      setFormData((prev: any) => ({ ...prev, documents: updatedDocs }));

      // Update DB
      const { data: authUser } = await supabase.auth.getUser();
      const userId = authUser?.user?.id;
      if (userId) {
        await supabase
          .from("personal_details")
          .update({ documents: updatedDocs })
          .eq("id", userId);
      }
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Failed to delete document.");
    }
  };

  return (
    <div className="p-6 rounded-md shadow-sm bg-white">
      <h2 className="text-lg font-bold mb-4">Uploaded Documents</h2>

      {/* Add new document */}
      <div className="mb-6">
        <h3 className="font-semibold text-md mb-2">Add New Document</h3>
        <input
          type="text"
          placeholder="Document Name"
          value={newDocName}
          onChange={(e) => setNewDocName(e.target.value)}
          className="border rounded p-2 w-full mb-2"
        />
        <input
          type="file"
          onChange={(e) => setNewDocFile(e.target.files?.[0] || null)}
          className="border rounded p-2 w-full mb-2"
        />
        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleAddDocument}
        >
          Add Document
        </button>
      </div>

      {/* List of uploaded documents */}
      {formData.documents?.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">Uploaded Documents:</h4>
          <ul className="space-y-2">
            {formData.documents.map((doc, index) => (
              <li
                key={index}
                className="flex justify-between items-center border p-2 rounded"
              >
                <span>{doc.name}</span>
                <div className="space-x-3">
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    View
                  </a>
                  <button
                    type="button"
                    onClick={() => handleDeleteDocument(doc)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DocumentUploadForm;
