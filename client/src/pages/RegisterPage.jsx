import { useForm } from "react-hook-form";
import { registerRequest } from "../api/auth";

function RegisterPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    const res = await registerRequest(values);
    console.log(res);
  });

  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      <form onSubmit={onSubmit} autoComplete="off">
        <div className="gap-4 flex flex-col">
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
            placeholder="Username"
          />
          <input
            autoComplete="false"
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
            placeholder="Email"
          />
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
            placeholder="Password"
          />
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
