import { FaCircleCheck } from "react-icons/fa6";

const Success = ({type, message, p}) => {

    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <FaCircleCheck className="text-secondary text-9xl" />
        <h2 className="text-white text-3xl font-extrabold">Success</h2>
        <p className="text-white text-center">
          {message}
          <br />
          <span className="text-center text-sm">
            {type === "signup" && (
            <a href="/auth?type=signin">
                {p}
            </a>
            )}
          </span>
        </p>
      </div>
    );

}
export default Success;