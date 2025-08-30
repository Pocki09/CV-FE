import { toast, Toaster } from "sonner";

/* eslint-disable @typescript-eslint/no-unused-vars */
export const ButtonDelete = (props: {
  api: string;
  id: string;
  onDeleteSuccess: (id: string) => void;
}) => {
  const { api, id, onDeleteSuccess } = props;

  const handleDelete = () => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa?");
    if (confirm) {
      fetch(api, {
        method: "DELETE",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code === "success") {
            toast.success(data.message);
            onDeleteSuccess(id);
          } else {
            toast.error(data.message);
          }
        });
    }
  };

  return (
    <>
      <Toaster richColors position="top-right"/>
        <button
          onClick={handleDelete}
          className="bg-[#FF0000] rounded-[4px] font-[400] text-[14px] text-white inline-block py-[8px] px-[20px]"
        >
          Xóa
        </button>
    </>
  );
};
