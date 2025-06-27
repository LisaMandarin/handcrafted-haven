"use client";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { message, Modal, Popconfirm } from "@/lib/antd";
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

async function deleteReview(id: string) {
  try {
    if (!id) {
      console.error("Invalid id")
      return false
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/id/${id}`,
      {
        method: "DELETE"
      }
    );
    if (!response.ok) {
      console.error("Unable to delete the review");
      return false;
    }
    const { success } = await response.json();
    return success;
  } catch (error) {
    console.error("Failed to delete the review: ", error);
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
  const [oldFormData, setOldFormData] = useState(reviewData);  // to control modal (reset the data when editing is canceled)
  const [newFormData, setNewFormData] = useState(reviewData);  // to control modal (update the data when editing)
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

  const handleDelete = async(id: string) => {
    const success = await deleteReview(id)
    if (success) {
      message.success("This review deleted successfully")
      router.refresh();
    }
  };

  return (
    <>
      <div className="space-x-4 min-w-20">
        <EditOutlined onClick={showModal} />
        <Popconfirm title="Warning" description="Are you sure you want to delete this review?" onConfirm={() => handleDelete(reviewData.id)} okText="Yes" cancelText="No">
          <DeleteOutlined />
        </Popconfirm>
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
