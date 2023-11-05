import computer from '@/assets/computer.svg'
import arrowRight from '@/assets/arrow-right.svg'
import permission from '@/assets/permission.svg'
import product from '@/assets/product.svg'
import user from '@/assets/user.svg'
import { useAppSelector } from '@/hooks/store'
import { Link } from 'react-router-dom'
function Main() {
  const { username } = useAppSelector((state) => ({ username: state.userSlice.username }))
  return (
    <div className="">
      <h2 className="text-center text-primary">{username}님, 환영합니다.</h2>
      <div className="flex justify-between mt-10 max-w-md m-auto border-2 border-[#313743] border-dashed p-4">
        <div className="flex items-center">
          <img className="w-24 md:w-36" src={computer} alt="computer" />
        </div>

        <div className="flex items-center">
          <img className="w-24 md:w-36" src={arrowRight} alt="arrow-right" />
        </div>
        <div className="flex flex-col ">
          {/* <Link to="user-list"> */}
          <img className="w-14 md:w-24 border-2 border-solid border-[#313743] p-4" src={user} alt="arrow-right" />
          {/* </Link> */}
          <img className="w-14 md:w-24 border-2 border-solid border-[#313743] p-4 mt-3" src={product} alt="product" />
          <img
            className="w-14 md:w-24 border-2 border-solid border-[#313743] p-4 mt-3"
            src={permission}
            alt="permission"
          />
        </div>
      </div>
    </div>
  )
}

export default Main
