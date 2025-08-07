import Link from "next/link";
import { FaMagnifyingGlass } from "react-icons/fa6";

export const Section1 = () => {
  return (
    <>
      <div className="bg-[#000065] py-[60px]">
        <div className="container mx-auto px-[16px]">
          <h1 className="text-white font-[700] text-[28px] text-center mb-[30px]">887 Việc làm IT cho Developer &quot;Chất&quot;</h1>
          <form action="" className="flex flex-wrap gap-x-[15px] gap-y-[12px] mb-[30px]">
            <select name="" className="bg-white md:w-[240px] w-[100%] h-[56px] rounded-[4px] px-[20px] font-[500] text-[16px] text-[#121212]">
              <option value="">Tất cả thành phố</option>
              <option value="">Hà Nội</option>
              <option value="">Đà Nẵng</option>
              <option value="">Hồ Chí Minh</option>
              <option value="">Khác</option>
            </select>
            <input type="text" name="" placeholder="Nhập từ khoá..." className="md:flex-1 flex-none w-[100%] bg-white h-[56px] rounded-[4px] px-[20px] font-[500] text-[16px] text-[#121212]" />
            <button className="bg-[#0088FF] md:w-[240px] w-[100%] h-[56px] rounded-[4px] text-white inline-flex items-center justify-center gap-[10px] font-[500] text-[16px]">
              <FaMagnifyingGlass className="text-[20px]" /> Tìm Kiếm
            </button>
          </form>
          <div className="flex items-center flex-wrap gap-x-[12px] gap-y-[15px]">
            <div className="font-[500] text-[16px] text-[#DEDEDE]">
              Mọi người đang tìm kiếm:
            </div>
            <div className="flex flex-wrap gap-[10px]">
              <Link href="#" className="border border-[#414042] bg-[#121212] hover:bg-[#414042] rounded-[20px] inline-block py-[8px] px-[22px] font-[500] text-[16px] text-[#DEDEDE] hover:text-white">
                ReactJS
              </Link>
              <Link href="#" className="border border-[#414042] bg-[#121212] hover:bg-[#414042] rounded-[20px] inline-block py-[8px] px-[22px] font-[500] text-[16px] text-[#DEDEDE] hover:text-white">
                Javascript
              </Link>
              <Link href="#" className="border border-[#414042] bg-[#121212] hover:bg-[#414042] rounded-[20px] inline-block py-[8px] px-[22px] font-[500] text-[16px] text-[#DEDEDE] hover:text-white">
                NodeJS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}