import { EditOutlined } from "@ant-design/icons";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { UpdateButtonType } from "@/types/data";

export default function UpdateButton({
  editMode,
  onEdit,
  onUpdate,
  onCancel,
}: UpdateButtonType) {
  return (
    <div className="flex justify-center">
      {!editMode && (
        <div className="flex flex-row p-4">
          <button
            className="px-3 py-1 lg:px-6 h-fit bg-custom-dark-brown text-custom-yellow-1 md:rounded-3xl lg:rounded-full"
            onClick={onEdit}
          >
            <EditOutlined />
            Edit
          </button>
        </div>
      )}
      {editMode && (
        <div className="flex flex-row gap-2 p-4">
          <button
            className="px-3 py-1 lg:px-6 h-fit bg-custom-dark-brown text-custom-yellow-1 md:rounded-3xl lg:rounded-full"
            onClick={onUpdate}
          >
            <AiOutlineCheck className="inline" />
            Update
          </button>
          <button
            className="px-3 py-1 lg:px-6 h-fit bg-custom-yellow-1 text-custom-dark-brown border border-custom-dark-brown md:rounded-3xl lg:rounded-full"
            onClick={onCancel}
          >
            <AiOutlineClose className="inline" />
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
