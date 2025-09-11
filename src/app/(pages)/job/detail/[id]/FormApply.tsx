/* eslint-disable @typescript-eslint/no-explicit-any */
import JustValidate from "just-validate";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

/* eslint-disable @typescript-eslint/no-unused-vars */
export const FormApply = (props: { jobId: string }) => {
  const { jobId } = props;
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validator = new JustValidate("formApply");

    validator
      .addField("#fullName", [
        {
          rule: "required",
          errorMessage: "Vui lòng nhập họ tên!",
        },
        {
          rule: "minLength",
          value: 5,
          errorMessage: "Vui lòng nhập ít nhất 5 ký tự!",
        },
        {
          rule: "maxLength",
          value: 50,
          errorMessage: "Vui lòng nhập tối đa 50 ký tự!",
        },
      ])
      .addField("#email", [
        {
          rule: "required",
          errorMessage: "Vui lòng nhập email!",
        },
        {
          rule: "email",
          errorMessage: "Email không đúng định dạng!",
        },
      ])
      .addField("#phone", [
        {
          rule: "required",
          errorMessage: "Vui lòng nhập số điện thoại!",
        },
        {
          rule: "customRegexp",
          value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
          errorMessage: "Số điện thoại không đúng định dạng!",
        },
      ])
      .addField("#fileCV", [
        {
          rule: "minFilesCount",
          value: 1,
          errorMessage: "Vui lòng nhập file CV!",
        },
        {
          rule: "files",
          value: {
            files: {
              extensions: ["pdf"],
              maxSize: 5 * 1024 * 1024,
              minSize: 0,
              types: ["application/pdf"],
            },
          },
          errorMessage: "Dung lượng file không được vượt quá 5MB!",
        },
      ])
      .onFail(() => {
        setIsValid(false);
      })
      .onSuccess(() => {
        setIsValid(true);
      });
  }, []);

  const handleSubmit = (event: any) => {
    if (isValid) {
      const fullName = event.target.fullName.value;
      const email = event.target.email.value;
      const phone = event.target.phone.value;
      const fileCV = event.target.fileCV.files[0];

      // Tạo FormData
      const formData = new FormData();
      formData.append("jobId", jobId);
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("fileCV", fileCV);

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/apply`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code == "error") {
            toast.error(data.message);
          }

          if (data.code == "success") {
            toast.success(data.message);
            event.target.reset();
          }
        });
    }
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <div id="boxFormApply" onSubmit={handleSubmit} className="border border-[#DEDEDE] rounded-[8px] p-[20px] mt-[20px]">
        <h2 className="font-[700] text-[20px] text-black mb-[20px]">
          Ứng tuyển ngay
        </h2>
        <form action="" className="" id="formApply">
          <div className="mb-[15px]">
            <label
              htmlFor="fullName"
              className="block font-[500] text-[14px] text-black mb-[5px]"
            >
              Họ tên *
            </label>
            <input
              type="text"
              name=""
              id="fullName"
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="mb-[15px]">
            <label
              htmlFor="email"
              className="block font-[500] text-[14px] text-black mb-[5px]"
            >
              Email *
            </label>
            <input
              type="email"
              name=""
              id="email"
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="mb-[15px]">
            <label
              htmlFor="phone"
              className="block font-[500] text-[14px] text-black mb-[5px]"
            >
              Số điện thoại *
            </label>
            <input
              type="text"
              name=""
              id="phone"
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="mb-[15px]">
            <label
              htmlFor="fileCV"
              className="block font-[500] text-[14px] text-black mb-[5px]"
            >
              File CV dạng PDF *
            </label>
            <input
              type="file"
              name=""
              id="fileCV"
              accept="application/pdf"
              className=""
            />
          </div>
          <button className="w-[100%] h-[48px] rounded-[4px] bg-[#0088FF] font-[700] text-[16px] text-white">
            Gửi CV ứng tuyển
          </button>
        </form>
      </div>
    </>
  );
};
