
import React, { useMemo, useState } from "react";
import {
  BedDouble,
  Plus,
  Search,
  ChevronDown,
  Eye,
  Pencil,
  Trash2,
  X,
  Save,
  MapPin,
  Wifi,
  Snowflake,
  Tv,
  Refrigerator,
  Car,
  ChevronLeft,
  ChevronRight,
  IndianRupee,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import "./ManageRoom.css";
import Room from "../../assets/SriKshetra Residency 03.png";

const initialRooms = [
  {
    id: 1,
    title: "Deluxe Room",
    description: "Spacious and comfortable room.",
    location: "Puri",
    price: 2000,
    discount: 10,
    amenities: ["AC", "WiFi", "TV"],
    image: Room,
    status: "Active",
  },
  {
    id: 2,
    title: "Premium Room",
    description: "Luxury stay with modern amenities.",
    location: "Puri",
    price: 3000,
    discount: 15,
    amenities: ["AC", "WiFi", "TV", "Mini Bar"],
    image: Room,
    status: "Active",
  },
  {
    id: 3,
    title: "Family Room",
    description: "Perfect for families.",
    location: "Konark",
    price: 3500,
    discount: 10,
    amenities: ["AC", "WiFi", "Parking"],
    image: Room,
    status: "Active",
  },
  {
    id: 4,
    title: "Standard Room",
    description: "Budget friendly room.",
    location: "Bhubaneswar",
    price: 1500,
    discount: 5,
    amenities: ["WiFi", "TV"],
    image: Room,
    status: "Active",
  },
  {
    id: 5,
    title: "AC Room",
    description: "Cool stay in comfortable room.",
    location: "Puri",
    price: 2500,
    discount: 10,
    amenities: ["AC", "WiFi", "TV"],
    image: Room,
    status: "Inactive",
  },
  {
    id: 6,
    title: "Suite Room",
    description: "Premium suite with extra comfort.",
    location: "Konark",
    price: 4000,
    discount: 20,
    amenities: ["AC", "WiFi", "TV", "Fridge"],
    image: Room,
    status: "Active",
  },
];

const emptyRoom = {
  title: "",
  description: "",
  location: "",
  price: "",
  discount: "",
  amenities: [],
  image: Room,
  status: "Active",
};

const ManageRoom = () => {
  const [rooms, setRooms] = useState(initialRooms);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);

  const [modalType, setModalType] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [formData, setFormData] = useState(emptyRoom);

  const [deleteRoom, setDeleteRoom] = useState(null);

  const itemsPerPage = 6;

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        room.title.toLowerCase().includes(search) ||
        room.location.toLowerCase().includes(search) ||
        room.description.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All Status" ||
        room.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [rooms, searchTerm, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRooms.length / itemsPerPage)
  );

  const paginatedRooms = filteredRooms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getFinalPrice = (price, discount) => {
    return Math.round(price - (price * discount) / 100);
  };

  const formatPrice = (price) => {
    return Number(price).toLocaleString("en-IN");
  };

  const openAddModal = () => {
    setFormData(emptyRoom);
    setSelectedRoom(null);
    setModalType("add");
  };

  const openEditModal = (room) => {
    setSelectedRoom(room);
    setFormData({
      ...room,
      amenities: [...room.amenities],
    });
    setModalType("edit");
  };

  const openViewModal = (room) => {
    setSelectedRoom(room);
    setModalType("view");
  };

  const closeModal = () => {
    setModalType("");
    setSelectedRoom(null);
    setFormData(emptyRoom);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAmenityChange = (event) => {
    const { value, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      amenities: checked
        ? [...previous.amenities, value]
        : previous.amenities.filter((item) => item !== value),
    }));
  };

  const handleSaveRoom = (event) => {
    event.preventDefault();

    const roomData = {
      ...formData,
      price: Number(formData.price),
      discount: Number(formData.discount || 0),
    };

    if (modalType === "edit" && selectedRoom) {
      setRooms((previous) =>
        previous.map((room) =>
          room.id === selectedRoom.id
            ? { ...room, ...roomData }
            : room
        )
      );
    } else {
      const newRoom = {
        ...roomData,
        id: Date.now(),
      };

      setRooms((previous) => [newRoom, ...previous]);
      setCurrentPage(1);
    }

    closeModal();
  };

  const handleDeleteRoom = () => {
    if (!deleteRoom) return;

    setRooms((previous) =>
      previous.filter((room) => room.id !== deleteRoom.id)
    );

    setDeleteRoom(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  };

  const getAmenityIcon = (amenity) => {
    const icons = {
      AC: <Snowflake size={13} />,
      WiFi: <Wifi size={13} />,
      TV: <Tv size={13} />,
      Fridge: <Refrigerator size={13} />,
      Parking: <Car size={13} />,
    };

    return icons[amenity] || null;
  };

  return (
    <div className="ManageRoom">
      {/* Header */}

      <section className="ManageRoom__header">
        <div className="ManageRoom__headerIcon">
          <BedDouble size={42} strokeWidth={1.8} />
        </div>

        <div className="ManageRoom__headerContent">
          <h2>Manage Room</h2>
          <p>View, add and manage ShreeKhetra Guest House rooms</p>
        </div>

        <button
          type="button"
          className="ManageRoom__addButton"
          onClick={openAddModal}
        >
          <Plus size={20} />
          <span>Add Room</span>
        </button>
      </section>

      {/* Toolbar */}

      <section className="ManageRoom__toolbar">
        <div className="ManageRoom__search">
          <Search size={20} />

          <input
            type="text"
            placeholder="Search rooms..."
            value={searchTerm}
            onChange={handleSearch}
          />

          {searchTerm && (
            <button
              type="button"
              title="Clear search"
              onClick={() => setSearchTerm("")}
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="ManageRoom__filter">
          <select
            value={statusFilter}
            onChange={handleStatusFilter}
            aria-label="Filter room status"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <ChevronDown size={17} />
        </div>
      </section>

      {/* Table */}

      <div className="ManageRoom__tableWrapper">
        <table className="ManageRoom__table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Location</th>
              <th>Price (₹)</th>
              <th>Discount (%)</th>
              <th>Final Price (₹)</th>
              <th>Amenities</th>
              <th>Image</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedRooms.length > 0 ? (
              paginatedRooms.map((room, index) => (
                <tr
                  key={room.id}
                  style={{
                    animationDelay: `${index * 70}ms`,
                  }}
                >
                  <td className="ManageRoom__numberCell">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>

                  <td className="ManageRoom__titleCell">
                    {room.title}
                  </td>

                  <td className="ManageRoom__descriptionCell">
                    {room.description}
                  </td>

                  <td className="ManageRoom__locationCell">
                    <span className="ManageRoom__location">
                      <MapPin size={13} />
                      {room.location}
                    </span>
                  </td>

                  <td className="ManageRoom__priceCell">
                    ₹ {formatPrice(room.price)}
                  </td>

                  <td>{room.discount}%</td>

                  <td className="ManageRoom__finalPriceCell">
                    ₹ {formatPrice(getFinalPrice(room.price, room.discount))}
                  </td>

                  <td>
                    <div className="ManageRoom__amenities">
                      {room.amenities.map((amenity) => (
                        <span
                          className="ManageRoom__amenity"
                          key={amenity}
                        >
                          {getAmenityIcon(amenity)}
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td>
                    <img
                      className="ManageRoom__roomImage"
                      src={room.image}
                      alt={room.title}
                      onError={(event) => {
                        event.currentTarget.src =
                          "/assets/rooms/default-room.jpg";
                      }}
                    />
                  </td>

                  <td>
                    <span
                      className={`ManageRoom__status ${
                        room.status === "Active"
                          ? "ManageRoom__status--active"
                          : "ManageRoom__status--inactive"
                      }`}
                    >
                      <span className="ManageRoom__statusDot" />
                      {room.status}
                    </span>
                  </td>

                  <td>
                    <div className="ManageRoom__actions">
                      <button
                        type="button"
                        className="ManageRoom__action ManageRoom__action--view"
                        title="View Room"
                        onClick={() => openViewModal(room)}
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        type="button"
                        className="ManageRoom__action ManageRoom__action--edit"
                        title="Edit Room"
                        onClick={() => openEditModal(room)}
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        type="button"
                        className="ManageRoom__action ManageRoom__action--delete"
                        title="Delete Room"
                        onClick={() => setDeleteRoom(room)}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="ManageRoom__empty">
                  <AlertCircle size={22} />
                  <span>No rooms found</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}

      <section className="ManageRoom__footer">
        <p>
          Showing{" "}
          {filteredRooms.length === 0
            ? 0
            : (currentPage - 1) * itemsPerPage + 1}{" "}
          to{" "}
          {Math.min(
            currentPage * itemsPerPage,
            filteredRooms.length
          )}{" "}
          of {filteredRooms.length} rooms
        </p>

        <div className="ManageRoom__pagination">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((page) => Math.max(1, page - 1))
            }
          >
            <ChevronLeft size={15} />
            Previous
          </button>

          <button
            type="button"
            className="ManageRoom__pageActive"
          >
            {currentPage}
          </button>

          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() =>
              setCurrentPage((page) =>
                Math.min(totalPages, page + 1)
              )
            }
          >
            Next
            <ChevronRight size={15} />
          </button>
        </div>
      </section>

      {/* Add / Edit Modal */}

      {(modalType === "add" || modalType === "edit") && (
        <div
          className="ManageRoom__modalOverlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div className="ManageRoom__modal">
            <div className="ManageRoom__modalHeader">
              <div>
                <h3>
                  {modalType === "add" ? "Add New Room" : "Edit Room"}
                </h3>
                <p>Manage your guest house room details</p>
              </div>

              <button type="button" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <form
              className="ManageRoom__form"
              onSubmit={handleSaveRoom}
            >
              <label>
                Room Title
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter room title"
                  required
                />
              </label>

              <label>
                Description
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter room description"
                  required
                />
              </label>

              <div className="ManageRoom__formGrid">
                <label>
                  Location
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Puri"
                    required
                  />
                </label>

                <label>
                  Price (₹)
                  <input
                    name="price"
                    type="number"
                    min="0"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="2000"
                    required
                  />
                </label>

                <label>
                  Discount (%)
                  <input
                    name="discount"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.discount}
                    onChange={handleInputChange}
                    placeholder="10"
                  />
                </label>

                <label>
                  Status
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </label>
              </div>

              <label>
                Room Image Path
                <input
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="/assets/rooms/room.jpg"
                />
              </label>

              <div className="ManageRoom__amenitySelect">
                <span className="ManageRoom__formLabel">
                  Amenities
                </span>

                <div className="ManageRoom__amenityOptions">
                  {["AC", "WiFi", "TV", "Mini Bar", "Parking", "Fridge"].map(
                    (amenity) => (
                      <label key={amenity}>
                        <input
                          type="checkbox"
                          value={amenity}
                          checked={formData.amenities.includes(amenity)}
                          onChange={handleAmenityChange}
                        />
                        {amenity}
                      </label>
                    )
                  )}
                </div>
              </div>

              <div className="ManageRoom__formActions">
                <button
                  type="button"
                  className="ManageRoom__cancel"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="ManageRoom__save"
                >
                  <Save size={17} />
                  {modalType === "add" ? "Add Room" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}

      {modalType === "view" && selectedRoom && (
        <div
          className="ManageRoom__modalOverlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div className="ManageRoom__modal ManageRoom__viewModal">
            <div className="ManageRoom__modalHeader">
              <div>
                <h3>Room Details</h3>
                <p>ShreeKhetra Guest House</p>
              </div>

              <button type="button" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <div className="ManageRoom__details">
              <img
                src={selectedRoom.image}
                alt={selectedRoom.title}
                onError={(event) => {
                  event.currentTarget.src =
                    "/assets/rooms/default-room.jpg";
                }}
              />

              <h3>{selectedRoom.title}</h3>
              <p>{selectedRoom.description}</p>

              <div>
                <span>Location</span>
                <strong>{selectedRoom.location}</strong>
              </div>

              <div>
                <span>Room Price</span>
                <strong>₹ {formatPrice(selectedRoom.price)}</strong>
              </div>

              <div>
                <span>Discount</span>
                <strong>{selectedRoom.discount}%</strong>
              </div>

              <div>
                <span>Final Price</span>
                <strong>
                  ₹{" "}
                  {formatPrice(
                    getFinalPrice(
                      selectedRoom.price,
                      selectedRoom.discount
                    )
                  )}
                </strong>
              </div>

              <div>
                <span>Status</span>
                <strong>{selectedRoom.status}</strong>
              </div>

              <div className="ManageRoom__detailAmenities">
                <span>Amenities</span>
                <strong>{selectedRoom.amenities.join(", ")}</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}

      {deleteRoom && (
        <div
          className="ManageRoom__modalOverlay ManageRoom__deleteOverlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setDeleteRoom(null);
            }
          }}
        >
          <div className="ManageRoom__deleteModal">
            <div className="ManageRoom__deleteIcon">
              <Trash2 size={30} />
            </div>

            <h3>Delete Room?</h3>

            <p>
              Are you sure you want to delete{" "}
              <strong>{deleteRoom.title}</strong>?
              <br />
              This action cannot be undone.
            </p>

            <div className="ManageRoom__deleteActions">
              <button
                type="button"
                className="ManageRoom__cancel"
                onClick={() => setDeleteRoom(null)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="ManageRoom__confirmDelete"
                onClick={handleDeleteRoom}
              >
                <Trash2 size={16} />
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRoom;
