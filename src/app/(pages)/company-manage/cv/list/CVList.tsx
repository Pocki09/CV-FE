/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client"
import { cvStatusList } from "@/config/cvList"
import { workingFormList } from "@/config/workingForm"
import Link from "next/link"
import { useEffect, useState } from "react"
import { CVItem } from "./CVItem"

export const CVList = () => {
  const [listCV, setListCV] = useState<any[]>([]);

  const handleDeleteSuccess = (deleteId: string) => {
    setListCV(prev => prev.filter(cv => cv.id !== deleteId));
  }

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/cv/list`, {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.code == "success") {
          setListCV(data.listCV);
        }
      })
  }, []);

  return (
    <>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
        {listCV.map(item => (
          <CVItem
            key={item.id}
            item={item}
            onDeleteSuccess={handleDeleteSuccess}
          />
        ))}
      </div>

      <div className="mt-[30px]">
        <select name="" className="border border-[#DEDEDE] rounded-[8px] py-[12px] px-[18px] font-[400] text-[16px] text-[#414042]">
          <option value="">Trang 1</option>
          <option value="">Trang 2</option>
          <option value="">Trang 3</option>
        </select>
      </div>
    </>
  )
}
