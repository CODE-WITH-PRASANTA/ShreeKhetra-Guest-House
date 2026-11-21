import React, { useMemo, useRef, useState } from "react";
import {
  BedDouble,
  MapPin,
  CalendarDays,
  IndianRupee,
  Percent,
  Star,
  ImagePlus,
  UploadCloud,
  RotateCcw,
  Save,
  FileText,
  CheckCircle2,
  X,
} from "lucide-react";
import "./AddRooms.css";

const AMENITIES = [
  "AC",
  "WiFi",
  "TV",
  "Room Service",
  "Parking",
  "Breakfast",
  "Hot Water",
  "Laundry",
];

const INITIAL_FORM = {
  title: "",
  description: "",
  location: "Srikhetra Guest House, Puri, Odisha",
  checkIn: "",
  checkOut: "",
  price: "",
  discountPrice: "",
  amenities: [],
};

const AddRooms = ({ onSave }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef(null);

  const finalPrice = useMemo(() => {
    const price = Number(form.price) || 0;
    const discount = Number(form.discountPrice) || 0;
    return Math.max(0, price - discount);
  }, [form.price, form.discountPrice]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
    setSuccess("");
  };

  const toggleAmenity = (amenity) => {
    setForm((current) => ({
      ...current,
      amenities: current.amenities.includes(amenity)
        ? current.amenities.filter((item) => item !== amenity)
        : [...current.amenities, amenity],
    }));
  };

  const processImage = (file) => {
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be 5MB or less.");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setError("");
    setSuccess("");
  };

  const handleFileChange = (event) => {
    processImage(event.target.files?.[0]);
    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    processImage(event.dataTransfer.files?.[0]);
  };

  const removeImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(null);
    setImagePreview("");
  };

  const handleReset = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setForm(INITIAL_FORM);
    setImageFile(null);
    setImagePreview("");
    setError("");
    setSuccess("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.title.trim() || !form.description.trim() || !form.location.trim()) {
      setError("Please complete the room title, description, and location.");
      return;
    }
    if (!form.checkIn || !form.checkOut) {
      setError("Please select both check-in and check-out dates.");
      return;
    }
    if (new Date(form.checkOut) <= new Date(form.checkIn)) {
      setError("Check-out date must be later than check-in date.");
      return;
    }
    if (!form.price || Number(form.price) <= 0) {
      setError("Please enter a valid room price.");
      return;
    }
    if (Number(form.discountPrice || 0) > Number(form.price)) {
      setError("Discount amount cannot be greater than the room price.");
      return;
    }
    if (!imageFile) {
      setError("Please upload a guest house room image.");
      return;
    }

    const roomRecord = {
      id: `ROOM-${Date.now()}`,
      ...form,
      price: Number(form.price),
      discountPrice: Number(form.discountPrice || 0),
      finalPrice,
      imageName: imageFile.name,
      createdAt: new Date().toISOString(),
    };

    try {
      const existingRooms = JSON.parse(localStorage.getItem("srikhetra_rooms") || "[]");
      localStorage.setItem("srikhetra_rooms", JSON.stringify([...existingRooms, roomRecord]));
      if (typeof onSave === "function") onSave(roomRecord, imageFile);
      setSuccess("Room details saved successfully on this device.");
      setForm(INITIAL_FORM);
      removeImage();
    } catch {
      setError("Unable to save room details. Please check your browser storage.");
    }
  };

  return (
    <main className="add-room-page">
      

      <section className="add-room-card">
        <header className="add-room-card-header">
          <div className="add-room-header-icon"><BedDouble size={30} /></div>
          <div>
            <h2>Add New Room</h2>
            <p>Fill in the details to add a room to Srikhetra Guest House</p>
          </div>
          <span className="add-room-header-tag">ROOM SETUP</span>
        </header>

        <form className="add-room-form" onSubmit={handleSubmit}>
          {error && <div className="add-room-alert add-room-alert-error" role="alert">{error}</div>}
          {success && <div className="add-room-alert add-room-alert-success"><CheckCircle2 size={18} />{success}</div>}

          <div className="add-room-grid add-room-grid-two">
            <div className="add-room-field">
              <label htmlFor="room-title"><BedDouble /> Room Title <b>*</b></label>
              <div className="add-room-input-wrap">
                <BedDouble className="add-room-input-icon" size={19} />
                <input id="room-title" name="title" value={form.title} onChange={updateField} placeholder="e.g. Deluxe AC Double Room" required />
              </div>
            </div>

            <div className="add-room-field">
              <label htmlFor="room-description"><FileText /> Description <b>*</b></label>
              <div className="add-room-input-wrap add-room-textarea-wrap">
                <FileText className="add-room-input-icon" size={19} />
                <textarea id="room-description" name="description" value={form.description} onChange={updateField} placeholder="Describe the room, facilities, view, and guest experience..." rows={4} required />
              </div>
            </div>

            <div className="add-room-field">
              <label htmlFor="room-location"><MapPin /> Location (Address) <b>*</b></label>
              <div className="add-room-input-wrap">
                <MapPin className="add-room-input-icon" size={19} />
                <input id="room-location" name="location" value={form.location} onChange={updateField} placeholder="Enter room or property location" required />
              </div>
            </div>
          </div>

          <div className="add-room-grid add-room-grid-two add-room-date-row">
            <div className="add-room-field">
              <label htmlFor="room-checkin"><CalendarDays /> Check In <b>*</b></label>
              <div className="add-room-input-wrap">
                <CalendarDays className="add-room-input-icon" size={19} />
                <input id="room-checkin" type="date" name="checkIn" value={form.checkIn} onChange={updateField} required />
              </div>
            </div>
            <div className="add-room-field">
              <label htmlFor="room-checkout"><CalendarDays /> Check Out <b>*</b></label>
              <div className="add-room-input-wrap">
                <CalendarDays className="add-room-input-icon" size={19} />
                <input id="room-checkout" type="date" name="checkOut" min={form.checkIn || undefined} value={form.checkOut} onChange={updateField} required />
              </div>
            </div>
          </div>

          <div className="add-room-grid add-room-grid-three add-room-price-row">
            <div className="add-room-field">
              <label htmlFor="room-price"><IndianRupee /> Price (₹) <b>*</b></label>
              <div className="add-room-input-wrap">
                <IndianRupee className="add-room-input-icon" size={19} />
                <input id="room-price" type="number" name="price" min="1" step="1" value={form.price} onChange={updateField} placeholder="Enter room price" required />
              </div>
            </div>
            <div className="add-room-field">
              <label htmlFor="room-discount"><Percent /> Discount Amount (₹)</label>
              <div className="add-room-input-wrap">
                <Percent className="add-room-input-icon" size={19} />
                <input id="room-discount" type="number" name="discountPrice" min="0" step="1" value={form.discountPrice} onChange={updateField} placeholder="Enter discount amount" />
              </div>
            </div>
            <div className="add-room-field">
              <label htmlFor="room-final-price"><Star /> Final Price (₹)</label>
              <div className="add-room-input-wrap add-room-final-price">
                <IndianRupee className="add-room-input-icon" size={19} />
                <input id="room-final-price" value={finalPrice.toLocaleString("en-IN")} readOnly aria-readonly="true" />
              </div>
            </div>
          </div>

          <div className="add-room-grid add-room-media-grid">
            <div className="add-room-field">
              <label><ImagePlus /> Upload Guest House Image <b>*</b></label>
              <input ref={fileInputRef} className="add-room-file-input" type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} />
              {imagePreview ? (
                <div className="add-room-image-preview">
                  <img src={imagePreview} alt="Room preview" />
                  <div className="add-room-image-info"><strong>{imageFile?.name}</strong><span>Image ready to upload</span></div>
                  <button type="button" onClick={removeImage} aria-label="Remove image"><X size={18} /></button>
                </div>
              ) : (
                <button
                  type="button"
                  className={`add-room-upload-zone ${dragActive ? "is-dragging" : ""}`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(event) => { event.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                >
                  <UploadCloud size={37} />
                  <strong>Click to upload image</strong>
                  <span>or drag and drop your room photo</span>
                  <small>JPG, PNG or WebP · Maximum 5MB</small>
                </button>
              )}
            </div>

            <div className="add-room-field">
              <label><Star /> Room Amenities</label>
              <div className="add-room-amenities">
                {AMENITIES.map((amenity) => (
                  <label className={`add-room-amenity ${form.amenities.includes(amenity) ? "is-checked" : ""}`} key={amenity}>
                    <input type="checkbox" checked={form.amenities.includes(amenity)} onChange={() => toggleAmenity(amenity)} />
                    <span className="add-room-custom-check"><CheckCircle2 size={15} /></span>
                    {amenity}
                  </label>
                ))}
              </div>
              <p className="add-room-hint">Select all facilities available in this room.</p>
            </div>
          </div>

          <div className="add-room-form-footer">
            <p><span>*</span> Required fields</p>
            <div className="add-room-actions">
              <button type="button" className="add-room-reset-btn" onClick={handleReset}><RotateCcw size={18} /> Reset</button>
              <button type="submit" className="add-room-save-btn"><Save size={18} /> Save Room</button>
            </div>
          </div>
        </form>
      </section>
      <p className="add-room-page-footnote">© {new Date().getFullYear()} Srikhetra Guest House · Manage your rooms with ease.</p>
    </main>
  );
};

export default AddRooms;
