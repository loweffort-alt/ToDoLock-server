import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, isAuthenticated, errors: loginErrors } = useAuth();

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signIn(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md text-center">
        {loginErrors.map((e, i) => (
          <div className="bg-red-500 p2 text-white" key={i}>
            {e}
          </div>
        ))}
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <form onSubmit={onSubmit} autoComplete="off">
          <div className="gap-4 flex flex-col mb-4">
            <input
              autoComplete="false"
              type="email"
              {...register("email", { required: true, minLength: 10 })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.type}</p>
            )}
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500">Password is required</p>
            )}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>
          </div>
        </form>
        <p className="flex place-content-evenly">Dont have an account?</p>
        <Link to="/register" className="text-sky-500">
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
