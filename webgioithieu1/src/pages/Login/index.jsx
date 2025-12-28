import { AiFillQuestionCircle } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { GrMail } from "react-icons/gr";
import "./Login.css";

import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { WrapperContext } from "../../components/Layout";
import axiosClient from "../../api/axiosClient";

/* ================= LOGIN FORM ================= */
const FormSignin = ({ setIsLoged }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const loginSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,      // ✅ FIX
          password: data.password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Đăng nhập thất bại", {
          position: "top-center",
        });
        return;
      }

      setIsLoged({
        status: true,
        user: result.user,
      });

      toast.success("Đăng nhập thành công", { position: "top-center" });
      navigate("/");
    } catch (err) {
      toast.error("Lỗi kết nối server");
    }
  };

  return (
    <form onSubmit={handleSubmit(loginSubmit)} id="form-1">
      <div className="singin-input">
        <div className="d-flex align-items-center">
          <div className="form-icon d-flex">
            <FaUser />
          </div>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
        </div>
        {errors.email && <span className="error">Vui lòng nhập email</span>}
      </div>

      <div className="singin-input">
        <div className="d-flex align-items-center">
          <div className="form-icon d-flex">
            <RiLockPasswordFill />
          </div>
          <input
            type="password"
            placeholder="Mật khẩu"
            {...register("password", { required: true, minLength: 6 })}
          />
        </div>
        {errors.password && (
          <span className="error">Mật khẩu tối thiểu 6 ký tự</span>
        )}
      </div>

      <div className="text-center mt-2">
        <button className="btn signin">Đăng nhập</button>
      </div>

      <div className="d-flex align-items-center justify-content-center font-small mt-4">
        <AiFillQuestionCircle />
        <span className="ms-1">Quên mật khẩu</span>
      </div>
    </form>
  );
};

/* ================= MAIN ================= */
const Login = () => {
  
  const { isLoged, setIsLoged, logout } = useContext(WrapperContext);
  const [isSignin, setIsSignin] = useState(true);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /* ===== REGISTER ===== */
  const signupSubmit = async (data) => {
    try {
      await axiosClient.post("/auth/register", {
        email: data.email,
        password: data.password,
      });

      toast.success("Đăng ký thành công, vui lòng đăng nhập");
      setIsSignin(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Đăng ký thất bại");
    }
  };

  /* ===== ĐÃ LOGIN ===== */
  if (isLoged?.status && isLoged?.user) {
    const user = isLoged.user;

    return (
      <div className="login-main-loged">
        <section className="banner"></section>
        <div className="container">
         
             <div className="text-center mt-4">
          <button
            className="btn white"
            onClick={logout}
          >
            Đăng xuất
          </button>
        </div>
        </div>
      </div>
    );
  }

  /* ===== CHƯA LOGIN ===== */
  return (
    <div className={`login-status d-flex ${isSignin ? "" : "light"}`}>
      <div className="login-main d-flex">
        <div className="login-sign-btn d-flex align-items-center">
          <div>
            <span>Bạn đã có tài khoản</span>
            <br />
            <button className="btn white" onClick={() => setIsSignin(true)}>
              Đăng nhập
            </button>
          </div>
          <div>
            <span>Bạn chưa có tài khoản</span>
            <br />
            <button className="btn" onClick={() => setIsSignin(false)}>
              Đăng ký
            </button>
          </div>
        </div>

        <div className={`login-runback ${isSignin ? "" : "run-right"}`}>
          {isSignin ? (
            <div className="login-box">
              <h2>Đăng nhập</h2>
              <FormSignin setIsLoged={setIsLoged} />
            </div>
          ) : (
            <div className="login-box">
              <h2>Đăng ký</h2>
              <form onSubmit={handleSubmit(signupSubmit)}>
                <div className="input-box">
                  <GrMail />
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: true })}
                  />
                  {errors.email && <span className="error">Nhập email</span>}
                </div>

                <div className="input-box">
                  <RiLockPasswordFill />
                  <input
                    type="password"
                    placeholder="Mật khẩu"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                    })}
                  />
                  {errors.password && (
                    <span className="error">Mật khẩu ≥ 6 ký tự</span>
                  )}
                </div>

                <button className="btn signup">Đăng ký</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
