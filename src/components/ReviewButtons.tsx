"use client";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { message, Modal } from "@/lib/antd";
import { useState } from "react";
import EditReviewModal from "./EditReviewModal";
import { DashboardPurchaseType } from "@/types/data";
import { useRouter } from "next/navigation";

async function updateReview(body: DashboardPurchaseType) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/id/`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    if (!response.ok) {
      console.error("Unable to update the review");
      return false;
    }
    const { success } = await response.json();
    return success;
  } catch (error) {
    console.error("Failed to update the review: ", error);
    return false;
  }
}
export default function ReviewButtons({
  reviewData,
}: {
  reviewData: DashboardPurchaseType;
}) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [oldFormData, setOldFormData] = useState(reviewData);
  const [newFormData, setNewFormData] = useState(reviewData);
  const showModal = () => {
    setNewFormData(oldFormData);
    setIsModalOpen(true);
  };
  const handleModalOK = async () => {
    const success = await updateReview(newFormData);
    if (success) {
      setOldFormData(newFormData);
      message.success("This review is updated successfully");
      setIsModalOpen(false);
      router.refresh();
    } else {
      message.error("Unable to update the review");
      return;
    }
  };
  const handleModalCancel = () => {
    setIsModalOpen(false);
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
