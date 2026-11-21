import React, { useMemo, useState } from "react";
import {
  Snowflake,
  CheckSquare,
  Download,
  Plus,
  ChevronDown,
  Search,
  X,
  Globe,
  Users,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  CalendarDays,
  UserRound,
  AlertTriangle,
  Save,
  RotateCcw,
} from "lucide-react";

import "./ColdLead.css";

const initialLeads = [
  {
    id: 1,
    name: "Rahul Mehta",
    initials: "RM",
    email: "rahul.mehta@gmail.com",
    phone: "+91 98765 43210",
    source: "Website",
    assigned: "Jane Doe",
    status: "New",
    date: "24 Oct 2025",
    time: "10:30 AM",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop",
  },
  {
    id: 2,
    name: "Priya Sharma",
    initials: "PS",
    email: "priya.sharma@gmail.com",
    phone: "+91 87654 32109",
    source: "Facebook",
    assigned: "John Smith",
    status: "Not Contacted",
    date: "23 Oct 2025",
    time: "04:15 PM",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop",
  },
  {
    id: 3,
    name: "Amit Kumar",
    initials: "AK",
    email: "amit.kumar@yahoo.com",
    phone: "+91 76543 21098",
    source: "Google Ads",
    assigned: "Jane Doe",
    status: "Cold",
    date: "22 Oct 2025",
    time: "11:20 AM",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop",
  },
  {
    id: 4,
    name: "Sneha Patel",
    initials: "SP",
    email: "sneha.patel@gmail.com",
    phone: "+91 65432 10987",
    source: "Referral",
    assigned: "Mike Wilson",
    status: "Follow Up",
    date: "21 Oct 2025",
    time: "02:45 PM",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop",
  },
  {
    id: 5,
    name: "Vikash Singh",
    initials: "VS",
    email: "vikash.singh@gmail.com",
    phone: "+91 98760 12345",
    source: "Website",
    assigned: "John Smith",
    status: "Not Contacted",
    date: "20 Oct 2025",
    time: "09:10 AM",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop",
  },
  {
    id: 6,
    name: "Neha Reddy",
    initials: "NR",
    email: "neha.reddy@gmail.com",
    phone: "+91 87650 98765",
    source: "Other",
    assigned: "Mike Wilson",
    status: "Cold",
    date: "19 Oct 2025",
    time: "01:30 PM",
    photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&h=120&fit=crop",
  },
  {
    id: 7,
    name: "Arjun Das",
    initials: "AD",
    email: "arjun.das@gmail.com",
    phone: "+91 98761 12345",
    source: "Website",
    assigned: "Jane Doe",
    status: "New",
    date: "18 Oct 2025",
    time: "11:00 AM",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop",
  },
  {
    id: 8,
    name: "Ananya Roy",
    initials: "AR",
    email: "ananya.roy@gmail.com",
    phone: "+91 98762 12345",
    source: "Facebook",
    assigned: "John Smith",
    status: "Follow Up",
    date: "17 Oct 2025",
    time: "12:20 PM",
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&h=120&fit=crop",
  },
  {
    id: 9,
    name: "Rohit Verma",
    initials: "RV",
    email: "rohit.verma@gmail.com",
    phone: "+91 98763 12345",
    source: "Google Ads",
    assigned: "Mike Wilson",
    status: "Cold",
    date: "16 Oct 2025",
    time: "03:30 PM",
    photo: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=120&h=120&fit=crop",
  },
  {
    id: 10,
    name: "Kavita Mishra",
    initials: "KM",
    email: "kavita.mishra@gmail.com",
    phone: "+91 98764 12345",
    source: "Referral",
    assigned: "Jane Doe",
    status: "New",
    date: "15 Oct 2025",
    time: "10:15 AM",
    photo: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=120&h=120&fit=crop",
  },
  {
    id: 11,
    name: "Sahil Gupta",
    initials: "SG",
    email: "sahil.gupta@gmail.com",
    phone: "+91 98765 12345",
    source: "Website",
    assigned: "John Smith",
    status: "Not Contacted",
    date: "14 Oct 2025",
    time: "09:45 AM",
    photo: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=120&h=120&fit=crop",
  },
  {
    id: 12,
    name: "Pooja Nair",
    initials: "PN",
    email: "pooja.nair@gmail.com",
    phone: "+91 98766 12345",
    source: "Other",
    assigned: "Mike Wilson",
    status: "Follow Up",
    date: "13 Oct 2025",
    time: "04:20 PM",
    photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=120&h=120&fit=crop",
  },
  {
    id: 13,
    name: "Karan Malhotra",
    initials: "KM",
    email: "karan.m@gmail.com",
    phone: "+91 98767 12345",
    source: "Website",
    assigned: "Jane Doe",
    status: "New",
    date: "12 Oct 2025",
    time: "10:00 AM",
    photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop",
  },
  {
    id: 14,
    name: "Isha Kapoor",
    initials: "IK",
    email: "isha.kapoor@gmail.com",
    phone: "+91 98768 12345",
    source: "Facebook",
    assigned: "John Smith",
    status: "Cold",
    date: "11 Oct 2025",
    time: "02:10 PM",
    photo: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=120&h=120&fit=crop",
  },
  {
    id: 15,
    name: "Manish Rao",
    initials: "MR",
    email: "manish.rao@gmail.com",
    phone: "+91 98769 12345",
    source: "Google Ads",
    assigned: "Mike Wilson",
    status: "Not Contacted",
    date: "10 Oct 2025",
    time: "11:35 AM",
    photo: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=120&h=120&fit=crop",
  },
  {
    id: 16,
    name: "Riya Sen",
    initials: "RS",
    email: "riya.sen@gmail.com",
    phone: "+91 98770 12345",
    source: "Referral",
    assigned: "Jane Doe",
    status: "Follow Up",
    date: "09 Oct 2025",
    time: "01:15 PM",
    photo: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=120&h=120&fit=crop",
  },
  {
    id: 17,
    name: "Aditya Jain",
    initials: "AJ",
    email: "aditya.jain@gmail.com",
    phone: "+91 98771 12345",
    source: "Website",
    assigned: "John Smith",
    status: "New",
    date: "08 Oct 2025",
    time: "03:10 PM",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop",
  },
  {
    id: 18,
    name: "Meera Joshi",
    initials: "MJ",
    email: "meera.joshi@gmail.com",
    phone: "+91 98772 12345",
    source: "Other",
    assigned: "Mike Wilson",
    status: "Cold",
    date: "07 Oct 2025",
    time: "12:40 PM",
    photo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=120&h=120&fit=crop",
  },
];

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  source: "Website",
  assigned: "Jane Doe",
  status: "New",
  photo: "",
};

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");

const ColdLead = () => {
  const [leads, setLeads] = useState(initialLeads);
  const [selected, setSelected] = useState([]);
  const [sourceFilter, setSourceFilter] = useState("All Sources");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [modal, setModal] = useState("");
  const [editingLead, setEditingLead] = useState(null);
  const [viewingLead, setViewingLead] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const pageSize = 6;

  const filteredLeads = useMemo(() => {
    const term = search.toLowerCase().trim();

    return leads.filter((lead) => {
      const matchesSource =
        sourceFilter === "All Sources" || lead.source === sourceFilter;

      const matchesStatus =
        statusFilter === "All Status" || lead.status === statusFilter;

      const matchesSearch =
        !term ||
        [
          lead.name,
          lead.email,
          lead.phone,
          lead.source,
          lead.assigned,
          lead.status,
        ].some((value) => value.toLowerCase().includes(term));

      return matchesSource && matchesStatus && matchesSearch;
    });
  }, [leads, sourceFilter, statusFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / pageSize));

  const currentPage = Math.min(page, totalPages);

  const currentLeads = filteredLeads.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const selectedOnPage = currentLeads.filter((lead) =>
    selected.includes(lead.id)
  );

  const allSelected =
    currentLeads.length > 0 &&
    selectedOnPage.length === currentLeads.length;

  const changePage = (nextPage) => {
    setPage(Math.max(1, Math.min(nextPage, totalPages)));
  };

  const handleFilterChange = (setter) => (value) => {
    setter(value);
    setPage(1);
    setSelected([]);
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelected((previous) =>
        previous.filter((id) => !currentLeads.some((lead) => lead.id === id))
      );
    } else {
      setSelected((previous) => [
        ...new Set([...previous, ...currentLeads.map((lead) => lead.id)]),
      ]);
    }
  };

  const toggleSelect = (id) => {
    setSelected((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const openAddModal = () => {
    setEditingLead(null);
    setForm(emptyForm);
    setModal("form");
  };

  const openEditModal = (lead) => {
    setEditingLead(lead);
    setForm({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      source: lead.source,
      assigned: lead.assigned,
      status: lead.status,
      photo: lead.photo,
    });
    setModal("form");
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const cleanedName = form.name.trim();
    const cleanedEmail = form.email.trim();
    const cleanedPhone = form.phone.trim();

    if (!cleanedName || !cleanedEmail || !cleanedPhone) {
      return;
    }

    if (editingLead) {
      setLeads((previous) =>
        previous.map((lead) =>
          lead.id === editingLead.id
            ? {
                ...lead,
                ...form,
                name: cleanedName,
                email: cleanedEmail,
                phone: cleanedPhone,
                initials: getInitials(cleanedName),
                photo:
                  form.photo.trim() ||
                  lead.photo ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    cleanedName
                  )}&background=e8f0ff&color=174ea6`,
              }
            : lead
        )
      );
    } else {
      const newLead = {
        id: Date.now(),
        ...form,
        name: cleanedName,
        email: cleanedEmail,
        phone: cleanedPhone,
        initials: getInitials(cleanedName),
        date: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        time: new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        photo:
          form.photo.trim() ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            cleanedName
          )}&background=e8f0ff&color=174ea6`,
      };

      setLeads((previous) => [newLead, ...previous]);
      setPage(1);
    }

    setModal("");
    setEditingLead(null);
    setForm(emptyForm);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;

    const ids = Array.isArray(deleteTarget)
      ? deleteTarget
      : [deleteTarget.id];

    setLeads((previous) => previous.filter((lead) => !ids.includes(lead.id)));
    setSelected((previous) =>
      previous.filter((id) => !ids.includes(id))
    );
    setDeleteTarget(null);
  };

  const openDelete = (lead) => {
    setDeleteTarget(lead);
  };

  const openBulkDelete = () => {
    if (selected.length === 0) return;
    setDeleteTarget([...selected]);
  };

  const exportCSV = () => {
    const exportData =
      selected.length > 0
        ? leads.filter((lead) => selected.includes(lead.id))
        : filteredLeads;

    if (exportData.length === 0) return;

    const headers = [
      "Name",
      "Email",
      "Phone",
      "Source",
      "Assigned To",
      "Status",
      "Created On",
    ];

    const rows = exportData.map((lead) => [
      lead.name,
      lead.email,
      lead.phone,
      lead.source,
      lead.assigned,
      lead.status,
      lead.date,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "cold-leads.csv";
    anchor.click();

    URL.revokeObjectURL(url);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "New":
        return "new";
      case "Not Contacted":
        return "not-contacted";
      case "Cold":
        return "cold";
      case "Follow Up":
        return "follow-up";
      default:
        return "new";
    }
  };

  const getSourceClass = (source) => {
    switch (source) {
      case "Website":
        return "website";
      case "Facebook":
        return "facebook";
      case "Google Ads":
        return "google-ads";
      case "Referral":
        return "referral";
      default:
        return "other";
    }
  };

  const renderSourceIcon = (source) => {
    switch (source) {
      case "Website":
        return <Globe size={15} />;

      case "Facebook":
        return <span className="coldlead-facebook-logo">f</span>;

      case "Google Ads":
        return <span className="coldlead-google">G</span>;

      case "Referral":
        return <Users size={15} />;

      default:
        return <MoreHorizontal size={15} />;
    }
  };

  const closeModal = () => {
    setModal("");
    setViewingLead(null);
  };

  const formatDeleteName = () => {
    if (Array.isArray(deleteTarget)) {
      return `${deleteTarget.length} selected leads`;
    }
    return deleteTarget?.name || "this lead";
  };

  const assignedPhotos = {
    "Jane Doe":
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=80&h=80&fit=crop",
    "John Smith":
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
    "Mike Wilson":
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop",
  };

  return (
    <section className="coldlead">
      <div className="coldlead__container">
        {/* HEADER */}

        <header className="coldlead-header">
          <div className="coldlead-heading">
            <div className="coldlead-heading__icon">
              <Snowflake />
            </div>

            <div>
              <h2>Cold Leads</h2>
              <p>Manage and track cold leads (not yet responded).</p>
            </div>
          </div>

          <div className="coldlead-header__actions">
            <button
              className="coldlead-btn coldlead-btn--select"
              onClick={toggleSelectAll}
              type="button"
            >
              <CheckSquare />
              {allSelected ? "Deselect All" : "Select All"}
            </button>

            <button
              className="coldlead-btn coldlead-btn--export"
              onClick={exportCSV}
              type="button"
            >
              <Download />
              Export
            </button>

            {selected.length > 0 && (
              <button
                className="coldlead-btn coldlead-btn--bulk-delete"
                onClick={openBulkDelete}
                type="button"
              >
                <Trash2 />
                Delete ({selected.length})
              </button>
            )}

            <button
              className="coldlead-btn coldlead-btn--add"
              onClick={openAddModal}
              type="button"
            >
              <Plus />
              Add Cold Lead
            </button>
          </div>
        </header>

        {/* FILTERS */}

        <div className="coldlead-toolbar">
          <label className="coldlead-filter">
            <select
              value={sourceFilter}
              onChange={(e) =>
                handleFilterChange(setSourceFilter)(e.target.value)
              }
            >
              <option>All Sources</option>
              <option>Website</option>
              <option>Facebook</option>
              <option>Google Ads</option>
              <option>Referral</option>
              <option>Other</option>
            </select>
            <ChevronDown />
          </label>

          <label className="coldlead-filter">
            <select
              value={statusFilter}
              onChange={(e) =>
                handleFilterChange(setStatusFilter)(e.target.value)
              }
            >
              <option>All Status</option>
              <option>New</option>
              <option>Not Contacted</option>
              <option>Cold</option>
              <option>Follow Up</option>
            </select>
            <ChevronDown />
          </label>

          <div className="coldlead-search">
            <Search />

            <input
              type="text"
              placeholder="Search by name, email, phone or company..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
                setSelected([]);
              }}
            />

            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setPage(1);
                }}
                aria-label="Clear search"
              >
                <X />
              </button>
            )}
          </div>

          <div className="coldlead-total">
            <Snowflake />
            <strong>Total Cold Leads: {leads.length}</strong>
          </div>
        </div>

        {/* TABLE */}

        <div className="coldlead-table-card">
          <div className="coldlead-table-scroll">
            <table className="coldlead-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleSelectAll}
                      aria-label="Select all visible leads"
                    />
                  </th>
                  <th>#</th>
                  <th>LEAD NAME</th>
                  <th>EMAIL</th>
                  <th>PHONE</th>
                  <th>SOURCE</th>
                  <th>ASSIGNED TO</th>
                  <th>STATUS</th>
                  <th>CREATED ON</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {currentLeads.map((lead, index) => (
                  <tr
                    key={lead.id}
                    className={
                      selected.includes(lead.id)
                        ? "coldlead-row--selected"
                        : ""
                    }
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selected.includes(lead.id)}
                        onChange={() => toggleSelect(lead.id)}
                        aria-label={`Select ${lead.name}`}
                      />
                    </td>

                    <td className="coldlead-number">
                      {(currentPage - 1) * pageSize + index + 1}
                    </td>

                    <td>
                      <div className="coldlead-person">
                        <img
                          className="coldlead-avatar"
                          src={lead.photo}
                          alt={lead.name}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src =
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                lead.name
                              )}&background=e8f0ff&color=174ea6`;
                          }}
                        />
                        <strong>{lead.name}</strong>
                      </div>
                    </td>

                    <td className="coldlead-muted">{lead.email}</td>
                    <td className="coldlead-muted">{lead.phone}</td>

                    <td>
                      <span
                        className={`coldlead-source coldlead-source--${getSourceClass(
                          lead.source
                        )}`}
                      >
                        {renderSourceIcon(lead.source)}
                        {lead.source}
                      </span>
                    </td>

                    <td>
                      <div className="coldlead-assigned">
                        <img
                          src={assignedPhotos[lead.assigned]}
                          alt={lead.assigned}
                          loading="lazy"
                        />
                        <span>{lead.assigned}</span>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`coldlead-status coldlead-status--${getStatusClass(
                          lead.status
                        )}`}
                      >
                        <i />
                        {lead.status}
                      </span>
                    </td>

                    <td>
                      <div className="coldlead-date">
                        <strong>{lead.date}</strong>
                        <span>{lead.time}</span>
                      </div>
                    </td>

                    <td>
                      <div className="coldlead-actions">
                        <button
                          type="button"
                          className="coldlead-action coldlead-action--view"
                          onClick={() => {
                            setViewingLead(lead);
                            setModal("view");
                          }}
                          title="View lead"
                          aria-label={`View ${lead.name}`}
                        >
                          <Eye />
                        </button>

                        <button
                          type="button"
                          className="coldlead-action coldlead-action--edit"
                          onClick={() => openEditModal(lead)}
                          title="Edit lead"
                          aria-label={`Edit ${lead.name}`}
                        >
                          <Pencil />
                        </button>

                        <button
                          type="button"
                          className="coldlead-action coldlead-action--delete"
                          onClick={() => openDelete(lead)}
                          title="Delete lead"
                          aria-label={`Delete ${lead.name}`}
                        >
                          <Trash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {currentLeads.length === 0 && (
                  <tr>
                    <td colSpan="10">
                      <div className="coldlead-empty">
                        <Search />
                        <h3>No leads found</h3>
                        <p>
                          Try changing your search or filter to find leads.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setSearch("");
                            setSourceFilter("All Sources");
                            setStatusFilter("All Status");
                            setPage(1);
                          }}
                        >
                          Reset Filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}

          <footer className="coldlead-footer">
            <p>
              Showing{" "}
              <strong>
                {filteredLeads.length === 0
                  ? 0
                  : (currentPage - 1) * pageSize + 1}
                {" to "}
                {Math.min(currentPage * pageSize, filteredLeads.length)}
              </strong>{" "}
              of <strong>{filteredLeads.length}</strong> leads
            </p>

            <div className="coldlead-pagination">
              <button
                type="button"
                className="coldlead-page-arrow"
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <ChevronLeft />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (number) => (
                  <button
                    type="button"
                    key={number}
                    onClick={() => changePage(number)}
                    className={`coldlead-page-number ${
                      currentPage === number ? "active" : ""
                    }`}
                  >
                    {number}
                  </button>
                )
              )}

              <button
                type="button"
                className="coldlead-page-arrow"
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <ChevronRight />
              </button>
            </div>
          </footer>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}

      {modal === "form" && (
        <div
          className="coldlead-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            className="coldlead-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="coldlead-form-title"
          >
            <div className="coldlead-modal__header">
              <div>
                <h3 id="coldlead-form-title">
                  {editingLead ? "Edit Cold Lead" : "Add New Cold Lead"}
                </h3>
                <p>Enter the lead information below.</p>
              </div>

              <button type="button" onClick={closeModal}>
                <X />
              </button>
            </div>

            <form className="coldlead-form" onSubmit={handleFormSubmit}>
              <div className="coldlead-form__grid">
                <label>
                  Lead Name *
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleFormChange}
                    placeholder="Enter full name"
                    required
                  />
                </label>

                <label>
                  Email Address *
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleFormChange}
                    placeholder="Enter email address"
                    required
                  />
                </label>

                <label>
                  Phone Number *
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleFormChange}
                    placeholder="Enter phone number"
                    required
                  />
                </label>

                <label>
                  Lead Source
                  <select
                    name="source"
                    value={form.source}
                    onChange={handleFormChange}
                  >
                    <option>Website</option>
                    <option>Facebook</option>
                    <option>Google Ads</option>
                    <option>Referral</option>
                    <option>Other</option>
                  </select>
                </label>

                <label>
                  Assigned To
                  <select
                    name="assigned"
                    value={form.assigned}
                    onChange={handleFormChange}
                  >
                    <option>Jane Doe</option>
                    <option>John Smith</option>
                    <option>Mike Wilson</option>
                  </select>
                </label>

                <label>
                  Lead Status
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleFormChange}
                  >
                    <option>New</option>
                    <option>Not Contacted</option>
                    <option>Cold</option>
                    <option>Follow Up</option>
                  </select>
                </label>

                <label style={{ gridColumn: "1 / -1" }}>
                  Profile Photo URL (optional)
                  <input
                    type="url"
                    name="photo"
                    value={form.photo}
                    onChange={handleFormChange}
                    placeholder="https://example.com/photo.jpg"
                  />
                </label>
              </div>

              <div className="coldlead-form__actions">
                <button
                  type="button"
                  className="coldlead-cancel"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button type="submit" className="coldlead-submit">
                  <Save />
                  {editingLead ? "Save Changes" : "Add Lead"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}

      {modal === "view" && viewingLead && (
        <div
          className="coldlead-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            className="coldlead-modal coldlead-view-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="coldlead-view-title"
          >
            <div className="coldlead-modal__header">
              <div>
                <h3 id="coldlead-view-title">Lead Details</h3>
                <p>Complete information about this lead.</p>
              </div>

              <button type="button" onClick={closeModal}>
                <X />
              </button>
            </div>

            <div className="coldlead-view-content">
              <div className="coldlead-view-profile">
                <img src={viewingLead.photo} alt={viewingLead.name} />

                <div>
                  <h4>{viewingLead.name}</h4>
                  <span>{viewingLead.email}</span>

                  <span
                    className={`coldlead-status coldlead-status--${getStatusClass(
                      viewingLead.status
                    )}`}
                  >
                    <i />
                    {viewingLead.status}
                  </span>
                </div>
              </div>

              <div className="coldlead-view-grid">
                <div>
                  <Mail />
                  <span>Email Address</span>
                  <strong>{viewingLead.email}</strong>
                </div>

                <div>
                  <Phone />
                  <span>Phone Number</span>
                  <strong>{viewingLead.phone}</strong>
                </div>

                <div>
                  <Globe />
                  <span>Lead Source</span>
                  <strong>{viewingLead.source}</strong>
                </div>

                <div>
                  <UserRound />
                  <span>Assigned To</span>
                  <strong>{viewingLead.assigned}</strong>
                </div>

                <div>
                  <CalendarDays />
                  <span>Created Date</span>
                  <strong>{viewingLead.date}</strong>
                </div>

                <div>
                  <CalendarDays />
                  <span>Created Time</span>
                  <strong>{viewingLead.time}</strong>
                </div>
              </div>

              <button
                type="button"
                className="coldlead-submit coldlead-view-edit"
                onClick={() => openEditModal(viewingLead)}
              >
                <Pencil size={15} />
                Edit Lead
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}

      {deleteTarget && (
        <div
          className="coldlead-delete-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setDeleteTarget(null);
          }}
        >
          <div
            className="coldlead-delete-modal"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="coldlead-delete-title"
          >
            <button
              type="button"
              className="coldlead-delete-close"
              onClick={() => setDeleteTarget(null)}
              aria-label="Close confirmation"
            >
              <X />
            </button>

            <div className="coldlead-warning-icon">
              <AlertTriangle />
            </div>

            <h3 id="coldlead-delete-title">Are you sure?</h3>

            <p>
              Do you really want to delete{" "}
              <strong>{formatDeleteName()}</strong>? This action cannot be
              undone.
            </p>

            {!Array.isArray(deleteTarget) && (
              <div className="coldlead-delete-person">
                <img src={deleteTarget.photo} alt={deleteTarget.name} />

                <div>
                  <strong>{deleteTarget.name}</strong>
                  <span>{deleteTarget.email}</span>
                </div>
              </div>
            )}

            <div className="coldlead-delete-actions">
              <button
                type="button"
                className="coldlead-delete-cancel"
                onClick={() => setDeleteTarget(null)}
              >
                <RotateCcw size={14} />
                Cancel
              </button>

              <button
                type="button"
                className="coldlead-delete-confirm"
                onClick={confirmDelete}
              >
                <Trash2 />
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ColdLead;