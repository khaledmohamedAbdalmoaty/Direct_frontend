/* import "../common/login.css" */
import LeftSide from '../../common/LeftSide'
import RegisterRight from "./RegiseterRight";
export default function Register() {
  return (

     <div className="login">
        <div className="loginWrapper">
          <LeftSide/>
          <RegisterRight/>
        </div>
      </div>
  );
}
