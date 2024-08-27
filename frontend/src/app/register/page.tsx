import Register from "@/components/register";
import Image from "next/image";
import Image0001 from "../image/m3.webp";

const RegisterForm: React.FC = () => {
  return (
    <>
      <div className="register max-w-[1200px] mx-auto my-0 flex justify-center items-center mt-4 pb-5 lg:pb-0 flex-col-reverse lg:flex-row">
        <div className="image w-full lg:w-1/2  flex justify-center items-center">
          <Image
            src={Image0001}
            alt="register logo"
            className="w-[300px] md:w-[400px]"
          />
        </div>
        <div className="form w-full lg:w-1/2 pb-4 lg:pb-0">
          <Register />
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
