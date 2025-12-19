"use client";

import { formatBytes } from "@/lib/format-bytes";
import { useSeoFormStore } from "@/store/use-seo-form-store";
import { upload } from '@vercel/blob/client';
import type React from "react";
import { useCallback, useRef, useState, type ChangeEvent, type DragEvent, type InputHTMLAttributes } from "react";

export type FileMetadata = {
  name: string;
  size: number;
  type: string;
  url: string;
  id: string;
};

export type FileLike = File | FileMetadata;

export type FileWithPreview = {
  file: FileLike;
  id: string;
  preview?: string;
};

export type FileUploadOptions = {
  formFieldName?: string; // iconImageFile|logoImageFile|imageFile
  maxFiles?: number; // Only used when multiple is true. Default is set in useFileUpload.
  maxSize?: number; // in bytes
  accept?: string;
  multiple?: boolean; // Defaults to false
  initialFiles?: FileMetadata[];
  onFilesChange?: (files: FileWithPreview[]) => void; // Callback when files change
  onFilesAdded?: (addedFiles: FileWithPreview[]) => void; // Callback when new files are added
};

export type FileUploadState = {
  files: FileWithPreview[];
  isDragging: boolean;
  errors: string[];
};

export type FileUploadActions = {
  addFiles: (files: FileList | File[]) => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
  clearErrors: () => void;
  handleDragEnter: (e: DragEvent<HTMLElement>) => void;
  handleDragLeave: (e: DragEvent<HTMLElement>) => void;
  handleDragOver: (e: DragEvent<HTMLElement>) => void;
  handleDrop: (e: DragEvent<HTMLElement>) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  openFileDialog: () => void;
  getInputProps: (props?: InputHTMLAttributes<HTMLInputElement>) => InputHTMLAttributes<HTMLInputElement> & {
    ref: React.Ref<HTMLInputElement>;
  };
};

export const useFileUpload = (options: FileUploadOptions = {}): [FileUploadState, FileUploadActions] => {
  const {
    formFieldName = "",
    maxFiles = Infinity,
    maxSize = Infinity,
    accept = "*",
    multiple = false,
    initialFiles = [],
    onFilesChange,
    onFilesAdded,
  } = options;

  const { setIconImageFile, setLogoImageFile, setImageFile } = useSeoFormStore();

  const [state, setState] = useState<FileUploadState>({
    files: initialFiles.map((file) => ({
      file,
      id: file.id,
      preview: file.url,
    })),
    isDragging: false,
    errors: [],
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback(
    (file: File | FileMetadata): string | null => {
      if (file instanceof File) {
        if (file.size > maxSize) {
          return `File "${file.name}" exceeds the maximum size of ${formatBytes(maxSize)}.`;
        }
      } else {
        if (file.size > maxSize) {
          return `File "${file.name}" exceeds the maximum size of ${formatBytes(maxSize)}.`;
        }
      }

      if (accept !== "*") {
        const acceptedTypes = accept.split(",").map((type) => type.trim());
        const fileType = file instanceof File ? file.type || "" : file.type;
        const fileExtension = `.${file instanceof File ? file.name.split(".").pop() : file.name.split(".").pop()}`;

        const isAccepted = acceptedTypes.some((type) => {
          if (type.startsWith(".")) {
            return fileExtension.toLowerCase() === type.toLowerCase();
          }
          if (type.endsWith("/*")) {
            const baseType = type.split("/")[0];
            return fileType.startsWith(`${baseType}/`);
          }
          return fileType === type;
        });

        if (!isAccepted) {
          return `File "${file instanceof File ? file.name : file.name}" is not an accepted file type.`;
        }
      }

      return null;
    },
    [accept, maxSize],
  );

  const createPreview = useCallback((file: File | FileMetadata): string | undefined => {
    if (file instanceof File) {
      return URL.createObjectURL(file);
    }
    return file.url;
  }, []);

  const generateUniqueId = useCallback((file: File | FileMetadata): string => {
    if (file instanceof File) {
      return `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    }
    return file.id;
  }, []);

  const clearFiles = useCallback(() => {
    setState((prev) => {
      // Clean up object URLs
      prev.files.forEach((file) => {
        if (file.preview && file.file instanceof File && file.file.type.startsWith("image/")) {
          URL.revokeObjectURL(file.preview);
        }
      });

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      const newState = {
        ...prev,
        files: [],
        errors: [],
      };
      onFilesChange?.(newState.files);
      return newState;
    });
  }, [onFilesChange]);

  const addFiles = useCallback(async  (newFiles: FileList | File[]) => {
      if (!newFiles || newFiles.length === 0) 
        return;

      const newFilesArray = Array.from(newFiles);
      const errors: string[] = [];

      // Clear existing errors when new files are uploaded
      setState((prev) => ({ ...prev, errors: [] }));

      // In single file mode, clear existing files first
      if (!multiple) {
        clearFiles();
      }

      // Check if adding these files would exceed maxFiles (only in multiple mode)
      if (multiple && maxFiles !== Infinity && state.files.length + newFilesArray.length > maxFiles) {
        errors.push(`You can only upload a maximum of ${maxFiles} files.`);
        setState((prev) => ({ ...prev, errors }));
        return;
      }

      const validFiles: FileWithPreview[] = [];

      for (const file of newFilesArray) {
        // Only check for duplicates if multiple files are allowed
        if (multiple) {
          const isDuplicate = state.files.some(
            (existingFile) => existingFile.file.name === file.name && existingFile.file.size === file.size,
          );

          // Skip duplicate files silently
          if (isDuplicate) {
            continue;
          }
        }

        // Check file size
        if (file.size > maxSize) {
          errors.push(
            multiple
              ? `Some files exceed the maximum size of ${formatBytes(maxSize)}.`
              : `File exceeds the maximum size of ${formatBytes(maxSize)}.`,
          );
          continue;
        }

        const error = validateFile(file);
        if (error) {
          errors.push(error);
          continue;
        } 
        
        try {
          // 3. Perform the upload to vercel
          const newBlob = await upload(`${process.env.NEXT_PUBLIC_IMAGES_PATH||'public'}/${file.name}`, file, {
            access: 'public',
            handleUploadUrl: '/api/vercel/upload',
          });

          const newFile: FileWithPreview = {
            file,
            id: generateUniqueId(file),
            //preview: createPreview(file), // Original code create a local blob image
            preview: newBlob.url, // 4. Use the actual Vercel URL as the preview/source
          };
          
          console.log(formFieldName);

          if(formFieldName == "iconImageFile")
            setIconImageFile(newFile);
          else if (formFieldName == "logoImageFile")
            setLogoImageFile(newFile);
          else if (formFieldName == "imageFile")
            setImageFile(newFile);

          validFiles.push(newFile);
        } catch (err) {
          errors.push(`Failed to upload ${file.name}.`);
          console.error("Vercel Upload Error:", err);
        }
      }
      
      // Only update state if we have valid files to add
      if (validFiles.length > 0) {
        // Call the onFilesAdded callback with the newly added valid files
        onFilesAdded?.(validFiles);

        setState((prev) => {
          const newFiles = !multiple ? validFiles : [...prev.files, ...validFiles];
          onFilesChange?.(newFiles);
          return {
            ...prev,
            files: newFiles,
            errors,
          };
        });
      } else if (errors.length > 0) {
        setState((prev) => ({
          ...prev,
          errors,
        }));
      }

      // Reset input value after handling files
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [
      state.files,
      formFieldName,
      maxFiles,
      multiple,
      maxSize,
      validateFile,
      createPreview,
      generateUniqueId,
      clearFiles,
      onFilesChange,
      onFilesAdded,
      setImageFile,
    ],
  );

  const removeFile = useCallback(async (id: string) => {
    // 1. Find the file to be removed from the current state
    const fileToRemove = state.files.find((f) => f.id === id);
    
    if (!fileToRemove) 
      return;

    const filePathToRemove = fileToRemove.preview;
    if (filePathToRemove) {
      // 2. For Vercel Blob URL 'preview' contains the https://...blob.vercel-storage.com URL
      if (filePathToRemove.startsWith('http')) {
        try {
          const response = await fetch(
            `/api/vercel/delete?url=${encodeURIComponent(filePathToRemove)}`,
            { method: 'DELETE' }
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to delete from server');
          }
          
          console.log(`Deleted from Vercel: ${fileToRemove.file.name}`);
        } catch (error) {
          console.error("Vercel deletion error:", error);
          setState(prev => ({ ...prev, errors: ["Failed to remove file from storage."] }));
          return;
        }
      } else {
        // 3. For a local object URL (blob:...), revoke it to free memory
        URL.revokeObjectURL(filePathToRemove);
      }
    }

    // 4. Update local state
    setState((prev) => {
      const newFiles = prev.files.filter((file) => file.id !== id);
      onFilesChange?.(newFiles);
      
      console.log("Removed from UI: " + fileToRemove.id);
      
      return {
        ...prev,
        files: newFiles,
        errors: [],
      };
    });
  }, [state.files, onFilesChange]);

  const clearErrors = useCallback(() => {
    setState((prev) => ({
      ...prev,
      errors: [],
    }));
  }, []);

  const handleDragEnter = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setState((prev) => ({ ...prev, isDragging: true }));
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.currentTarget.contains(e.relatedTarget as Node)) {
      return;
    }

    setState((prev) => ({ ...prev, isDragging: false }));
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setState((prev) => ({ ...prev, isDragging: false }));

      // Don't process files if the input is disabled
      if (inputRef.current?.disabled) {
        return;
      }

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        // In single file mode, only use the first file
        if (!multiple) {
          const file = e.dataTransfer.files[0];
          addFiles([file]);
        } else {
          addFiles(e.dataTransfer.files);
        }
      }
    },
    [addFiles, multiple],
  );

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        addFiles(e.target.files);
      }
    },
    [addFiles],
  );

  const openFileDialog = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);

  const getInputProps = useCallback(
    (props: InputHTMLAttributes<HTMLInputElement> = { onChange: () => {} }) => {
      return {
        ...props,
        type: "file" as const,
        onChange: handleFileChange,
        accept: props.accept || accept,
        multiple: props.multiple !== undefined ? props.multiple : multiple,
        ref: inputRef,
      };
    },
    [accept, multiple, handleFileChange],
  );

  return [
    state,
    {
      addFiles,
      removeFile,
      clearFiles,
      clearErrors,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      handleFileChange,
      openFileDialog,
      getInputProps,
    },
  ];
};
