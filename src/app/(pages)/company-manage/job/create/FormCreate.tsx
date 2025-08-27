/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { editor } from "@/app/components/editor/editor";
import JustValidate from "just-validate";
import { useEffect, useRef, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { Toaster, toast } from "sonner";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview);

export const FormCreate = () => {
  const editorRef = useRef(null);
  const [isValid, setIsValid] = useState(false);
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    const validator = new JustValidate("#createForm");

    validator
      .addField("#title", [
        {
          rule: "required",
          errorMessage: "Vui lòng nhập tên công việc!",
        },
      ])
      .addField("#salaryMin", [
        {
          rule: "minNumber",
          value: 0,
          errorMessage: "Vui lòng nhập mức lương >= 0",
        },
      ])
      .addField("#salaryMax", [
        {
          rule: "minNumber",
          value: 0,
          errorMessage: "Vui lòng nhập mức lương >= 0",
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
      const title = event.target.title.value;
      const salaryMin = event.target.salaryMin.value;
      const salaryMax = event.target.salaryMax.value;
      const position = event.target.position.value;
      const workingForm = event.target.workingForm.value;
      const technologies = event.target.technologies.value;
      let description = "";
      if (editorRef.current) {
        description = (editorRef.current as any).getContent();
      }
      const formData = new FormData();
      formData.append("title", title);
      formData.append("salaryMin", salaryMin);
      formData.append("salaryMax", salaryMax);
      formData.append("position", position);
      formData.append("workingForm", workingForm);
      formData.append("technologies", technologies);
      formData.append("description", description);

      // images
      if (images.length > 0) {
        for (const image of images) {
          formData.append("images", image.file);
        }
      }

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/job/create`, {
        method: "POST",
        body: formData,
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code == "error") {
            toast.error(data.message);
          }

          if (data.code == "success") {
            toast.success(data.message);
            event.target.reset();
            setImages([]);
          }
        });
    }
  };

  return (
    <>
      <form
        id="createForm"
        onSubmit={handleSubmit}
        action=""
        className="grid sm:grid-cols-2 grid-cols-1 gap-x-[20px] gap-y-[15px]"
      >
        <div className="sm:col-span-2">
          <label
            htmlFor="title"
            className="block font-[500] text-[14px] text-black mb-[5px]"
          >
            Tên công việc *
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
          />
        </div>
        <div className="">
          <label
            htmlFor="salaryMin"
            className="block font-[500] text-[14px] text-black mb-[5px]"
          >
            Mức lương tối thiểu ($)
          </label>
          <input
            type="number"
            name="salaryMin"
            id="salaryMin"
            className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
          />
        </div>
        <div className="">
          <label
            htmlFor="salaryMax"
            className="block font-[500] text-[14px] text-black mb-[5px]"
          >
            Mức lương tối đa ($)
          </label>
          <input
            type="number"
            name="salaryMax"
            id="salaryMax"
            className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
          />
        </div>
        <div className="">
          <label
            htmlFor="position"
            className="block font-[500] text-[14px] text-black mb-[5px]"
          >
            Cấp bậc *
          </label>
          <select
            name=""
            id="position"
            className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
          >
            <option value="">Intern</option>
            <option value="">Fresher</option>
            <option value="">Junior</option>
            <option value="">Middle</option>
            <option value="">Senior</option>
            <option value="">Manager</option>
          </select>
        </div>
        <div className="">
          <label
            htmlFor="workingForm"
            className="block font-[500] text-[14px] text-black mb-[5px]"
          >
            Hình thức làm việc *
          </label>
          <select
            name=""
            id="workingForm"
            className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
          >
            <option value="">Tại văn phòng</option>
            <option value="">Làm từ xa</option>
            <option value="">Linh hoạt</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="technologies"
            className="block font-[500] text-[14px] text-black mb-[5px]"
          >
            Các công nghệ
          </label>
          <input
            type="text"
            name=""
            id="technologies"
            className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="images"
            className="block font-[500] text-[14px] text-black mb-[5px]"
          >
            Danh sách ảnh *
          </label>

          <FilePond
            name="images"
            allowMultiple={true}
            labelIdle="+"
            acceptedFileTypes={["image/*"]}
            files={images}
            onupdatefiles={setImages}
            maxFiles={8}
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="description"
            className="block font-[500] text-[14px] text-black mb-[5px]"
          >
            Mô tả chi tiết
          </label>

          {editor({
            editorRef: editorRef,
            id: "description",
          })}

          <textarea
            name=""
            id="description"
            className="w-[100%] h-[350px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
          ></textarea>
        </div>
        <div className="sm:col-span-2">
          <button className="bg-[#0088FF] rounded-[4px] h-[48px] px-[20px] font-[700] text-[16px] text-white">
            Tạo mới
          </button>
        </div>
      </form>
    </>
  );
};
