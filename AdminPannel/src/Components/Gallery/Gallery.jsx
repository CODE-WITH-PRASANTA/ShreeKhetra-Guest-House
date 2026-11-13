import React, { useEffect, useRef, useState } from "react";
import "./Gallery.css";

const initialPhotos = [
  {
    id: 1,
    title: "Mountain Escape",
    category: "Nature",
    location: "Eastern Himalayas",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Tropical Paradise",
    category: "Beach",
    location: "Puri Beach, Odisha",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Forest Adventure",
    category: "Wildlife",
    location: "Similipal National Park",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&auto=format&fit=crop",
  },
];

const categories = [
  "Nature",
  "Beach",
  "Wildlife",
  "Rooms",
  "Interior",
  "Exterior",
  "Restaurant",
  "Events",
  "Other",
];

const GalleryIcon = ({ name, size = 20 }) => {
  const paths = {
    image: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </>
    ),
    folder: (
      <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    text: (
      <>
        <path d="M4 6h16M12 6v14M8 20h8" />
      </>
    ),
    upload: (
      <>
        <path d="M12 16V4m-5 5 5-5 5 5" />
        <path d="M20 16.5v2A2.5 2.5 0 0 1 17.5 21h-11A2.5 2.5 0 0 1 4 18.5v-2" />
      </>
    ),
    reset: (
      <>
        <path d="M3 11a9 9 0 1 1 2.5 6.5" />
        <path d="M3 4v7h7" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    edit: (
      <>
        <path d="m16 5 3 3M4 20l4.5-1 11-11a2.1 2.1 0 0 0-3-3l-11 11L4 20Z" />
      </>
    ),
    trash: (
      <>
        <path d="M3 6h18M8 6V4h8v2m-10 0 1 14h10l1-14M10 10v6m4-6v6" />
      </>
    ),
    search: (
      <>
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 5 5" />
      </>
    ),
    close: <path d="m18 6-12 12M6 6l12 12" />,
    check: <path d="m5 12 4 4L19 6" />,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
};

const Gallery = ({ onSave, initialData }) => {
  const [photos, setPhotos] = useState(initialData || initialPhotos);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [dragging, setDragging] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [saving, setSaving] = useState(false);

  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setPhotos(initialData);
    }
  }, [initialData]);

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
  };

  const handleFile = (file) => {
    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      showMessage("Please upload a JPG, PNG or WEBP image.", "error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showMessage("Image size must not exceed 5 MB.", "error");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
      setImageName(file.name);
      setMessage("");
    };

    reader.onerror = () => {
      showMessage("Unable to read this image. Please try again.", "error");
    };

    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setTitle("");
    setCategory("");
    setLocation("");
    setImage("");
    setImageName("");
    setEditingId(null);
    setMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEdit = (photo) => {
    setEditingId(photo.id);
    setTitle(photo.title);
    setCategory(photo.category);
    setLocation(photo.location);
    setImage(photo.image);
    setImageName("Previously uploaded image");
    setMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!image) {
      showMessage("Please select a gallery photograph.", "error");
      return;
    }

    const cleanTitle = title.trim();
    const cleanLocation = location.trim();

    if (!cleanTitle || !category || !cleanLocation) {
      showMessage("Please complete all required fields.", "error");
      return;
    }

    const photoData = {
      id: editingId || Date.now(),
      title: cleanTitle,
      category,
      location: cleanLocation,
      image,
    };

    try {
      setSaving(true);

      if (editingId) {
        setPhotos((previous) =>
          previous.map((photo) =>
            photo.id === editingId ? photoData : photo
          )
        );

        showMessage("Photograph updated successfully!");
      } else {
        setPhotos((previous) => [photoData, ...previous]);

        showMessage("Photograph added to gallery successfully!");
      }

      if (onSave) {
        await onSave(photoData);
      }

      setTitle("");
      setCategory("");
      setLocation("");
      setImage("");
      setImageName("");
      setEditingId(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      showMessage(
        error.message || "Unable to save photograph.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    if (!deleteId) return;

    setPhotos((previous) =>
      previous.filter((photo) => photo.id !== deleteId)
    );

    if (editingId === deleteId) {
      handleReset();
    }

    setDeleteId(null);
    showMessage("Photograph deleted successfully!");
  };

  const filteredPhotos = photos.filter((photo) => {
    const searchText = search.toLowerCase().trim();

    return (
      photo.title.toLowerCase().includes(searchText) ||
      photo.category.toLowerCase().includes(searchText) ||
      photo.location.toLowerCase().includes(searchText)
    );
  });

  return (
    <section className="gallery">

      {/* =====================================
          ADD / EDIT PHOTOGRAPH FORM
      ====================================== */}

      <form
        className="gallery__card"
        onSubmit={handleSave}
        ref={formRef}
      >
        <div className="gallery__header">
          <div className="gallery__header-icon">
            <GalleryIcon name="image" size={29} />
          </div>

          <div className="gallery__heading">
            <h2>
              {editingId ? "Edit Gallery Photograph" : "Add Gallery Photograph"}
            </h2>
            <p>
              Enter the photograph details and upload an image.
            </p>
          </div>
        </div>

        <div className="gallery__divider" />

        {/* FORM INPUTS */}

        <div className="gallery__fields">

          <div className="gallery__field">
            <label htmlFor="gallery-title">
              <GalleryIcon name="text" />
              <span>Photograph Title <b>*</b></span>
            </label>

            <input
              id="gallery-title"
              type="text"
              placeholder="Enter photograph title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="gallery__field">
            <label htmlFor="gallery-category">
              <GalleryIcon name="folder" />
              <span>Category <b>*</b></span>
            </label>

            <select
              id="gallery-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                Choose category
              </option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="gallery__field">
            <label htmlFor="gallery-location">
              <GalleryIcon name="location" />
              <span>Location <b>*</b></span>
            </label>

            <input
              id="gallery-location"
              type="text"
              placeholder="Enter destination or location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

        </div>

        {/* UPLOAD LABEL */}

        <div className="gallery__upload-section">
          <label className="gallery__upload-label">
            <GalleryIcon name="image" />
            <span>Gallery Image <b>*</b></span>
          </label>

          <div className="gallery__upload-grid">

            {/* UPLOAD AREA */}

            <div
              className={`gallery__dropzone ${
                dragging ? "is-dragging" : ""
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                handleFile(e.dataTransfer.files?.[0]);
              }}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Upload gallery image"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => handleFile(e.target.files?.[0])}
                hidden
              />

              <div className="gallery__upload-icon">
                <GalleryIcon name="upload" size={36} />
              </div>

              <h3>
                {image ? "Change Gallery Image" : "Upload Gallery Image"}
              </h3>

              <p>Click to browse your device</p>

              <span className="gallery__file-info">
                JPG, PNG or WEBP &nbsp;·&nbsp; Maximum 5 MB
              </span>

              {imageName && (
                <span className="gallery__filename">
                  <GalleryIcon name="check" size={13} />
                  {imageName}
                </span>
              )}
            </div>

            {/* PREVIEW AREA */}

            <div
              className={`gallery__preview ${
                image ? "has-preview" : ""
              }`}
            >
              {image ? (
                <>
                  <img
                    src={image}
                    alt="Selected gallery photograph"
                  />

                  <div className="gallery__preview-overlay">
                    <span>
                      <GalleryIcon name="check" size={16} />
                      Image Preview
                    </span>

                    <button
                      type="button"
                      className="gallery__remove"
                      aria-label="Remove image"
                      onClick={() => {
                        setImage("");
                        setImageName("");
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                    >
                      <GalleryIcon name="close" size={17} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="gallery__empty">
                  <GalleryIcon name="image" size={43} />
                  <h3>No image selected</h3>
                  <p>Your image preview will appear here.</p>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* STATUS */}

        {message && (
          <div
            className={`gallery__message ${messageType}`}
            role="status"
          >
            <GalleryIcon
              name={messageType === "success" ? "check" : "close"}
              size={17}
            />
            {message}
          </div>
        )}

        {/* FORM ACTIONS */}

        <div className="gallery__footer">

          <button
            type="button"
            className="gallery__reset"
            onClick={handleReset}
          >
            <GalleryIcon name="reset" size={19} />
            Reset
          </button>

          <button
            type="submit"
            className="gallery__save"
            disabled={saving}
          >
            {editingId ? (
              <GalleryIcon name="check" size={20} />
            ) : (
              <GalleryIcon name="plus" size={21} />
            )}

            {saving
              ? "Saving..."
              : editingId
              ? "Update Photograph"
              : "Save Photograph"}
          </button>

        </div>
      </form>

      {/* =====================================
          GALLERY PHOTOGRAPHS TABLE
      ====================================== */}

      <div className="gallery__list-card">

        {/* TABLE HEADER */}

        <div className="gallery__list-header">

          <div className="gallery__list-title">
            <div className="gallery__header-icon">
              <GalleryIcon name="image" size={29} />
            </div>

            <div>
              <h2>Gallery Photographs</h2>
              <p>View, search, edit, and manage uploaded photographs.</p>
            </div>
          </div>

          <div className="gallery__search">
            <GalleryIcon name="search" size={19} />

            <input
              type="search"
              placeholder="Search by title, category or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search photographs"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <GalleryIcon name="close" size={15} />
              </button>
            )}
          </div>

        </div>

        {/* TABLE */}

        <div className="gallery__table-wrapper">

          <table className="gallery__table">

            <thead>
              <tr>
                <th>SL. NO.</th>
                <th>IMAGE</th>
                <th>TITLE</th>
                <th>CATEGORY</th>
                <th>LOCATION</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>

              {filteredPhotos.length > 0 ? (
                filteredPhotos.map((photo, index) => (
                  <tr key={photo.id}>

                    <td className="gallery__serial">
                      {String(index + 1).padStart(2, "0")}
                    </td>

                    <td>
                      <div className="gallery__thumbnail">
                        <img
                          src={photo.image}
                          alt={photo.title}
                          loading="lazy"
                        />
                      </div>
                    </td>

                    <td className="gallery__photo-title">
                      {photo.title}
                    </td>

                    <td>
                      <span className="gallery__category">
                        {photo.category}
                      </span>
                    </td>

                    <td>
                      <div className="gallery__location">
                        <GalleryIcon name="location" size={17} />
                        <span>{photo.location}</span>
                      </div>
                    </td>

                    <td>
                      <div className="gallery__actions">

                        <button
                          type="button"
                          className="gallery__edit"
                          title="Edit photograph"
                          aria-label={`Edit ${photo.title}`}
                          onClick={() => handleEdit(photo)}
                        >
                          <GalleryIcon name="edit" size={19} />
                        </button>

                        <button
                          type="button"
                          className="gallery__delete"
                          title="Delete photograph"
                          aria-label={`Delete ${photo.title}`}
                          onClick={() => setDeleteId(photo.id)}
                        >
                          <GalleryIcon name="trash" size={19} />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="gallery__no-results"
                  >
                    <GalleryIcon name="image" size={32} />
                    <strong>No photographs found</strong>
                    <span>
                      {search
                        ? "Try another search keyword."
                        : "Add your first gallery photograph above."}
                    </span>
                  </td>
                </tr>
              )}

            </tbody>

          </table>
        </div>

        {/* TABLE FOOTER */}

        <div className="gallery__list-footer">
          <p>
            Showing <strong>{filteredPhotos.length}</strong> of{" "}
            <strong>{photos.length}</strong> photographs
          </p>

          <h4>
            Total photographs: <span>{photos.length}</span>
          </h4>
        </div>

      </div>

      {/* =====================================
          DELETE CONFIRMATION
      ====================================== */}

      {deleteId !== null && (
        <div
          className="gallery__modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setDeleteId(null);
            }
          }}
        >
          <div
            className="gallery__delete-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-delete-title"
          >
            <div className="gallery__delete-icon">
              <GalleryIcon name="trash" size={25} />
            </div>

            <h3 id="gallery-delete-title">Delete Photograph?</h3>

            <p>
              Are you sure you want to delete this photograph?
              This action cannot be undone.
            </p>

            <div className="gallery__modal-actions">

              <button
                type="button"
                className="gallery__cancel-delete"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="gallery__confirm-delete"
                onClick={handleDelete}
              >
                <GalleryIcon name="trash" size={16} />
                Delete
              </button>

            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default Gallery;