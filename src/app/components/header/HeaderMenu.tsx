import { useAuth } from "@/hooks/useAuth";
import Link from "next/link"
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";

export const HeaderMenu = (props: {
  showMenu: boolean
}) => {
  const { showMenu } = props;
  const { isLogin } = useAuth();

  return (
    <>
      <nav className={"lg:block " + (showMenu ? "fixed top-0 left-0 w-[280px] h-[100vh] z-[999] bg-[#000065]" : "hidden")}>
        <ul className="flex gap-x-[30px] flex-wrap">
          <li className="inline-flex lg:w-auto w-full items-center lg:justify-start justify-between lg:p-0 p-[10px] gap-x-[8px] relative group/sub-1">
            <Link href="#" className="font-[600] text-[16px] text-white">
              Việc Làm IT
            </Link>
            <FaAngleDown className="text-white text-[16px]" />
            <ul className="absolute top-[100%] left-[0] w-[280px] bg-[#000065] hidden group-hover/sub-1:block">
              <li className="py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#000096] relative group/sub-2">
                <Link href="#" className="font-[600] text-[16px] text-white">
                  Việc làm IT theo kỹ năng
                </Link>
                <FaAngleRight className="text-white text-[16px]" />
                <ul className="absolute top-[0] left-[100%] w-[280px] bg-[#000065] hidden group-hover/sub-2:block">
                  <li className="py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#000096]">
                    <Link href="#" className="font-[600] text-[16px] text-white">
                      ReactJS
                    </Link>
                  </li>
                  <li className="py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#000096]">
                    <Link href="#" className="font-[600] text-[16px] text-white">
                      NodeJS
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#000096]">
                <Link href="#" className="font-[600] text-[16px] text-white">
                  Việc làm IT theo công ty
                </Link>
                <FaAngleRight className="text-white text-[16px]" />
              </li>
              <li className="py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#000096]">
                <Link href="#" className="font-[600] text-[16px] text-white">
                  Việc làm IT theo thành phố
                </Link>
                <FaAngleRight className="text-white text-[16px]" />
              </li>
            </ul>
          </li>
          <li className="inline-flex lg:w-auto w-full items-center lg:justify-start justify-between lg:p-0 p-[10px] gap-x-[8px]">
            <Link href="#" className="font-[600] text-[16px] text-white">
              Top Công Ty IT
            </Link>
            <FaAngleDown className="text-white text-[16px]" />
          </li>
          {!isLogin && (
            <li className="inline-flex lg:w-auto w-full items-center lg:justify-start justify-between lg:p-0 p-[10px] gap-x-[8px] relative group/sub-1">
              <Link href="#" className="font-[600] text-[16px] text-white">
                Nhà Tuyển Dụng
              </Link>
              <FaAngleDown className="text-white text-[16px]" />
              <ul className="absolute top-[100%] left-[0] w-[280px] bg-[#000065] hidden group-hover/sub-1:block">
                <li className="py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#000096] relative group/sub-2">
                  <Link href="/company/login" className="font-[600] text-[16px] text-white">
                    Đăng Nhập
                  </Link>
                </li>
                <li className="py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#000096] relative group/sub-2">
                  <Link href="/company/register" className="font-[600] text-[16px] text-white">
                    Đăng Ký
                  </Link>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </nav>
    </>
  )
}