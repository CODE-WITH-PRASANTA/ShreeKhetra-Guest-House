
import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  PenSquare, FileText, Type, Link2, FolderOpen, Tags,
  CalendarDays, ImagePlus, UploadCloud, X, Bold, Italic,
  List, Heading2, Eye, EyeOff, Save, Send, RotateCcw,
  CheckCircle2, AlertCircle
} from "lucide-react";

import bannerImg from "../../assets/SriKshetra Residency 03.png";
import "./AddBlog.css";

const CATEGORIES = [
  "Travel Guide",
  "Puri Jagannath Temple",
  "Beach & Nature",
  "Food & Culture",
  "Guest House News",
  "Festivals",
];

const INITIAL = {
  title: "",
  slug: "",
  category: "",
  publishDate: "",
  excerpt: "",
  content: "",
};

const slugify = (text) =>
  text.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const Field = ({ icon: Icon, label, required, error, children, className = "" }) => (
  <div className={`ab-field ${className}`}>
    <label className="ab-label">
      <Icon size={16} className="ab-label-icon" />
      <span>{label}</span>
      {required && <b className="ab-required">*</b>}
    </label>
    {children}
    {error && (
      <p className="ab-error">
        <AlertCircle size={14} /> {error}
      </p>
    )}
  </div>
);

const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 3200);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className={`ab-toast ab-toast--${toast.type}`} role="status">
      {toast.type === "success"
        ? <CheckCircle2 size={18} />
        : <AlertCircle size={18} />}
      <span>{toast.message}</span>
      <button type="button" className="ab-toast-close" onClick={onClose}>
        <X size={16} />
      </button>
    </div>
  );
};

const AddBlog = () => {
  const [form, setForm] = useState(INITIAL);
  const [slugTouched, setSlugTouched] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const fileRef = useRef(null);
  const contentRef = useRef(null);

  const wordCount = useMemo(
    () => form.content.trim()
      ? form.content.trim().split(/\s+/).length : 0,
    [form.content]
  );

  // Entrance animation restarts whenever this page mounts.
  useEffect(() => {
    const page = document.querySelector(".ab-page");
    if (!page) return;

    page.classList.remove("ab-page--entered");
    void page.offsetWidth;
    page.classList.add("ab-page--entered");
  }, []);

  useEffect(() => {
    return () => {
      if (image?.url) URL.revokeObjectURL(image.url);
    };
  }, [image]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "title" && !slugTouched) {
        next.slug = slugify(value);
      }
      return next;
    });

    if (errors[name]) {
      setErrors((p) => ({ ...p, [name]: "" }));
    }
  };

  const handleSlug = (e) => {
    setSlugTouched(true);
    setForm((p) => ({ ...p, slug: slugify(e.target.value) }));
  };

  const pickImage = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setToast({ type: "error", message: "Please choose a valid image." });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setToast({ type: "error", message: "Image must be smaller than 5 MB." });
      return;
    }

    setImage({ file, url: URL.createObjectURL(file) });
    setErrors((p) => ({ ...p, image: "" }));
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    pickImage(e.dataTransfer.files?.[0]);
  };

  const removeImage = () => {
    setImage(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const addTag = () => {
    const t = tagInput.trim().replace(/,$/, "");
    if (!t) return;

    if (tags.some((x) => x.toLowerCase() === t.toLowerCase())) {
      setTagInput("");
      return;
    }

    if (tags.length >= 8) {
      setToast({ type: "error", message: "You can add up to 8 tags." });
      return;
    }

    setTags((prev) => [...prev, t]);
    setTagInput("");
  };

  const onTagKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && !tagInput && tags.length) {
      setTags((prev) => prev.slice(0, -1));
    }
  };

  const removeTag = (t) => {
    setTags((prev) => prev.filter((x) => x !== t));
  };

  const format = (before, after = before, placeholder = "text") => {
    const el = contentRef.current;
    if (!el) return;

    const { selectionStart: s, selectionEnd: e, value } = el;
    const selected = value.slice(s, e) || placeholder;
    const updated =
      value.slice(0, s) + before + selected + after + value.slice(e);

    setForm((p) => ({ ...p, content: updated }));

    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(
        s + before.length,
        s + before.length + selected.length
      );
    });
  };

  const formatList = () => {
    const el = contentRef.current;
    if (!el) return;

    const { selectionStart: s, selectionEnd: e, value } = el;
    const selected = value.slice(s, e) || "List item";

    const list = selected
      .split("\n")
      .map((l) => l.startsWith("- ") ? l : `- ${l}`)
      .join("\n");

    setForm((p) => ({
      ...p,
      content: value.slice(0, s) + list + value.slice(e),
    }));

    requestAnimationFrame(() => el.focus());
  };

  const validate = (status) => {
    const err = {};

    if (!form.title.trim()) err.title = "Blog title is required.";

    if (status === "published") {
      if (!form.category) err.category = "Please select a category.";
      if (!form.excerpt.trim()) err.excerpt = "Add a short summary.";
      if (form.content.trim().length < 50) {
        err.content = "Write at least 50 characters of content.";
      }
      if (!image) err.image = "Please upload a cover image.";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const submit = async (status) => {
    if (!validate(status)) {
      setToast({
        type: "error",
        message: "Please fix the highlighted fields.",
      });
      return;
    }

    setSaving(true);

    const data = new FormData();

    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    data.append("tags", JSON.stringify(tags));
    data.append("status", status);

    if (image) data.append("image", image.file);

    try {
      // Connect your backend API here.
      await new Promise((r) => setTimeout(r, 900));

      console.log("Blog payload:", Object.fromEntries(data.entries()));

      setToast({
        type: "success",
        message: status === "published"
          ? "Blog published successfully!"
          : "Draft saved.",
      });

      if (status === "published") resetForm(false);
    } catch {
      setToast({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  const resetForm = (notify = true) => {
    setForm(INITIAL);
    setTags([]);
    setTagInput("");
    setSlugTouched(false);
    setErrors({});
    setShowPreview(false);
    removeImage();

    if (notify) {
      setToast({ type: "success", message: "Form cleared." });
    }
  };

  return (
    <div className="ab-page">

      <div className="ab-background-glow ab-glow-one"></div>
      <div className="ab-background-glow ab-glow-two"></div>

      <section className="ab-card">

        <div className="ab-banner">
          <div className="ab-banner-shine"></div>

          <div className="ab-banner-icon">
            <img src={bannerImg} alt="Srikhetra Guest House" />
          </div>

          <div className="ab-banner-text">
            <span className="ab-banner-subtitle">SHREEKHETRA GUEST HOUSE</span>
            <h2>Write New Blog</h2>
            <p>
              Share travel tips, temple guides and news from Srikhetra Guest House
            </p>
          </div>

          <span className="ab-banner-pill">BLOG SETUP</span>
        </div>

        <form
          className="ab-form"
          onSubmit={(e) => e.preventDefault()}
          noValidate
        >
          <div className="ab-grid">

            <Field icon={Type} label="Blog Title" required error={errors.title}>
              <div className={`ab-input ${errors.title ? "is-invalid" : ""}`}>
                <Type size={18} />
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Best time to visit Puri Jagannath Temple"
                  maxLength={120}
                />
              </div>
            </Field>

            <Field icon={Link2} label="URL Slug">
              <div className="ab-input">
                <Link2 size={18} />
                <input
                  type="text"
                  name="slug"
                  value={form.slug}
                  onChange={handleSlug}
                  placeholder="auto-generated-from-title"
                />
              </div>
            </Field>

            <Field icon={FolderOpen} label="Category" required error={errors.category}>
              <div className={`ab-input ${errors.category ? "is-invalid" : ""}`}>
                <FolderOpen size={18} />
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </Field>

            <Field icon={CalendarDays} label="Publish Date">
              <div className="ab-input">
                <CalendarDays size={18} />
                <input
                  type="date"
                  name="publishDate"
                  value={form.publishDate}
                  onChange={handleChange}
                />
              </div>
            </Field>

            <Field
              icon={FileText}
              label="Short Summary"
              required
              error={errors.excerpt}
              className="ab-span-2"
            >
              <div className={`ab-input ab-input--area ${errors.excerpt ? "is-invalid" : ""}`}>
                <FileText size={18} />
                <textarea
                  name="excerpt"
                  rows={2}
                  value={form.excerpt}
                  onChange={handleChange}
                  maxLength={220}
                  placeholder="A short teaser shown on the blog listing page..."
                />
              </div>
              <span className="ab-counter">{form.excerpt.length}/220</span>
            </Field>

            <Field icon={Tags} label="Tags" className="ab-span-2">
              <div
                className="ab-tags-box"
                onClick={() => document.getElementById("ab-tag-input")?.focus()}
              >
                {tags.map((t) => (
                  <span className="ab-tag" key={t}>
                    #{t}
                    <button
                      type="button"
                      onClick={() => removeTag(t)}
                      aria-label={`Remove ${t}`}
                    >
                      <X size={13} />
                    </button>
                  </span>
                ))}

                <input
                  id="ab-tag-input"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={onTagKey}
                  onBlur={addTag}
                  placeholder={tags.length ? "Add more..." : "Type a tag and press Enter"}
                />
              </div>
            </Field>

            <Field
              icon={ImagePlus}
              label="Cover Image"
              required
              error={errors.image}
              className="ab-span-2"
            >
              {!image ? (
                <div
                  className={`ab-drop ${dragOver ? "is-over" : ""} ${errors.image ? "is-invalid" : ""}`}
                  onClick={() => fileRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={onDrop}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      fileRef.current?.click();
                    }
                  }}
                >
                  <div className="ab-drop-icon">
                    <UploadCloud size={24} />
                  </div>
                  <p className="ab-drop-title">Click to upload or drag & drop</p>
                  <p className="ab-drop-sub">JPG, PNG or WEBP · up to 5 MB</p>
                </div>
              ) : (
                <div className="ab-preview-img">
                  <img src={image.url} alt="Cover preview" />
                  <div className="ab-preview-actions">
                    <button
                      type="button"
                      className="ab-btn ab-btn--light"
                      onClick={() => fileRef.current?.click()}
                    >
                      <ImagePlus size={16} /> Change
                    </button>
                    <button
                      type="button"
                      className="ab-btn ab-btn--danger-light"
                      onClick={removeImage}
                    >
                      <X size={16} /> Remove
                    </button>
                  </div>
                </div>
              )}

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => pickImage(e.target.files?.[0])}
              />
            </Field>

            <Field
              icon={PenSquare}
              label="Blog Content"
              required
              error={errors.content}
              className="ab-span-2"
            >
              <div className={`ab-editor ${errors.content ? "is-invalid" : ""}`}>
                <div className="ab-toolbar">
                  <button type="button" title="Heading" onClick={() => format("## ", "", "Heading")}>
                    <Heading2 size={18} />
                  </button>
                  <button type="button" title="Bold" onClick={() => format("**")}>
                    <Bold size={18} />
                  </button>
                  <button type="button" title="Italic" onClick={() => format("_")}>
                    <Italic size={18} />
                  </button>
                  <button type="button" title="Bulleted list" onClick={formatList}>
                    <List size={18} />
                  </button>
                  <button type="button" title="Link" onClick={() => format("[", "](https://)", "link text")}>
                    <Link2 size={18} />
                  </button>

                  <span className="ab-toolbar-spacer" />
                  <span className="ab-words">{wordCount} words</span>

                  <button
                    type="button"
                    className={`ab-toggle ${showPreview ? "is-on" : ""}`}
                    onClick={() => setShowPreview((v) => !v)}
                  >
                    {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
                    {showPreview ? "Edit" : "Preview"}
                  </button>
                </div>

                {showPreview ? (
                  <div className="ab-live">
                    {image && <img src={image.url} alt="" className="ab-live-cover" />}
                    <h3>{form.title || "Untitled blog"}</h3>
                    {form.category && <span className="ab-live-cat">{form.category}</span>}
                    <div className="ab-live-body">
                      {form.content || "Nothing to preview yet."}
                    </div>
                  </div>
                ) : (
                  <textarea
                    ref={contentRef}
                    name="content"
                    rows={7}
                    value={form.content}
                    onChange={handleChange}
                    placeholder="Start writing your blog story here..."
                  />
                )}
              </div>
            </Field>

          </div>

          <div className="ab-actions">
            <button
              type="button"
              className="ab-btn ab-btn--ghost"
              onClick={() => resetForm()}
              disabled={saving}
            >
              <RotateCcw size={16} /> Reset
            </button>

            <div className="ab-actions-right">
              <button
                type="button"
                className="ab-btn ab-btn--outline"
                onClick={() => submit("draft")}
                disabled={saving}
              >
                <Save size={16} /> Save Draft
              </button>

              <button
                type="button"
                className="ab-btn ab-btn--primary"
                onClick={() => submit("published")}
                disabled={saving}
              >
                {saving ? <span className="ab-spinner" /> : <Send size={16} />}
                {saving ? "Saving..." : "Publish Blog"}
              </button>
            </div>
          </div>
        </form>
      </section>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
};

export default AddBlog;
