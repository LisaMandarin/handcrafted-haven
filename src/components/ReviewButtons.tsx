"use client";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Modal } from "@/lib/antd";
import { useState } from "react";
import EditReviewModal from "./EditReviewModal";
import { DashboardPurchaseType } from "@/types/data";

export default function ReviewButtons({
  reviewData,
}: {
  reviewData: DashboardPurchaseType;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [oldFormData, setOldFormData] = useState(reviewData);
  const [newFormData, setNewFormData] = useState(reviewData);
  const showModal = () => {
    setNewFormData(oldFormData)
    setIsModalOpen(true)
  };
  const handleModalOK = () => {
    setOldFormData(newFormData);
    setIsModalOpen(false)
  };
  const handleModalCancel = () => {
    setIsModalOpen(false)
  };
  const handleModalChange = (field: string, value: string | number) => {
    setNewFormData((prev) => ({ ...prev, [field]: value }));
  };

  const deleteReview = (id: string) => {
    alert(`${id} is going to be deleted`);
  };

  return (
    <>
      <div className="space-x-4 min-w-20">
        <EditOutlined onClick={showModal} />
        <DeleteOutlined onClick={() => deleteReview(reviewData.id)} />
      </div>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleModalOK}
        onCancel={handleModalCancel}
      >
        <EditReviewModal formData={newFormData} onChange={handleModalChange} />
      </Modal>
    </>
  );
}
