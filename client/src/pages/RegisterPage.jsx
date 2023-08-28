import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signUp, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((values) => {
    console.log(isAuthenticated);
    signUp(values);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md text-center">
        <h1 className="text-2xl font-bold text-center mb-4">
          Create a new account!
        </h1>
        <form onSubmit={onSubmit} autoComplete="off">
          <div className="gap-4 flex flex-col mb-4">
            {registerErrors.map((e, i) => (
              <div className="bg-red-500 p2 text-white" key={i}>
                {e}
              </div>
            ))}
            <input
              type="text"
              {...register("username", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-red-500">Username is required</p>
            )}
            <input
              autoComplete="false"
              type="email"
              {...register("email", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}
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
              Sign Up
            </button>
          </div>
        </form>
        <p className="flex place-content-evenly">Already have an account?</p>
        <Link to="/login" className="text-sky-500">
          Log in
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage;
