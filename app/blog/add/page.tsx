"use client"

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Toaster, toast } from "react-hot-toast"

const postBlog = async ({ title, description}: {title: string, description: string}) => {
  const res = fetch("http://localhost:3000/api/blogs", {
    method: "POST",
    body: JSON.stringify({ title, description }),
    //@ts-ignore
    "Content-Type": "application/json",
  })
  return (await res).json();
}

const AddBlog = () => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (titleRef.current && descriptionRef.current){
      toast.loading("Sending Request 🏃‍♂️", {id: "1"})
      await postBlog({
        title: titleRef.current?.value, 
        description: descriptionRef.current?.value
      });
      toast.success("Blog Posted Successfully 🧘‍♂️", {id: "1"})
      setTimeout(() => {
        router.push('/');
      }, 3000);
    }
  };

  return (
    <>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">
            Add you blog 📝
          </p>
          <form onSubmit={handleSubmit}>
            <input
              ref={titleRef}
              className="rounded-md px-4 py-2 my-2 w-full"
              type="text"
              placeholder="Enter title"
            />
            <textarea
              ref={descriptionRef}
              className="rounded-md px-4 py-2 my-2 w-full"
              placeholder="Enter title"
            />
            <button
              className="font-semibold px-4 py-2 shadow-xl bg-slate-300 
              rounded-lg m-auto hover:bg-slate-100"
            >
              Submit
            </button>
          </form>

        </div>
      </div>
    </>
  )
}

export default AddBlog
