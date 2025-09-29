import React from "react";
import { Link } from "react-router";

const ItemCard = ({ activity }) => {
  const {
    id,
    name,
    description,
    type,
    level,
    team_size,
    date,
    location,
    reg_open,
    reg_close,
    contact_name,
    contact_phone,
    contact_email,
    status,
  } = activity;

  return (
    <div className="card w-full max-w-xl bg-base-100 shadow-md border border-base-200 mx-auto">
      <div className="card-body">
        <h2 className="card-title text-primary">{name || "ชื่อกิจกรรม"}</h2>
        <p className="text-sm text-gray-500 mb-2">
          {description || "ไม่มีรายละเอียด"}
        </p>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div>
            <span className="font-semibold">ประเภท:</span> {type || "-"}
          </div>
          <div>
            <span className="font-semibold">ระดับ:</span> {level || "-"}
          </div>
          <div>
            <span className="font-semibold">ทีมละ:</span> {team_size} คน
          </div>
          <div>
            <span className="font-semibold">วันที่จัด:</span> {formatDate(date)}
          </div>
          <div className="col-span-2">
            <span className="font-semibold">สถานที่:</span> {location || "-"}
          </div>
          <div className="col-span-2">
            <span className="font-semibold">เปิดรับสมัคร:</span>{" "}
            {formatDate(reg_open)} - {formatDate(reg_close)}
          </div>
        </div>

        <div className="mt-4 border-t border-base-300 pt-3 text-sm">
          <p className="font-semibold">📞 ผู้ติดต่อ:</p>
          <p>{contact_name || "-"}</p>
          <p>{contact_phone || "-"}</p>
          <p>{contact_email || "-"}</p>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <span
            className={`badge px-4 py-2 text-sm font-semibold ${statusColor(
              status
            )}`}
          >
            {statusLabel(status)}
          </span>

          <Link to={`/update/${id}`} className="btn btn-sm btn-warning">
            ✏️ แก้ไข
          </Link>
        </div>
      </div>
    </div>
  );
};

// แปลงวันที่เป็นภาษาไทย
const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// แปลงสถานะเป็นข้อความ
const statusLabel = (status) => {
  switch (status) {
    case "active":
      return "🟢 กำลังดำเนินการ";
    case "pending":
      return "🟡 รอดำเนินการ";
    case "closed":
      return "🔴 ปิดกิจกรรม";
    default:
      return "⚪ ร่างกิจกรรม";
  }
};

// กำหนดสีของ badge ตามสถานะ
const statusColor = (status) => {
  switch (status) {
    case "active":
      return "badge-success";
    case "pending":
      return "badge-warning";
    case "closed":
      return "badge-error";
    default:
      return "badge-ghost";
  }
};

export default ItemCard;
