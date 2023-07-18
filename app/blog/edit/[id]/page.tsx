"use client"

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Toaster, toast } from "react-hot-toast"


interface UpdateBlogParams {
  id: string
  title: string
  description: string
}

const updateBlog = async ({ id, title, description }: UpdateBlogParams) => {
  const res = fetch(`http://localhost:3000/api/blogs/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, description }),
    //@ts-ignore
    "Content-Type": "application/json",
  })
  return (await res).json();
}

const deleteBlog = async (id: string) => {
  const res = fetch(`http://localhost:3000/api/blogs/${id}`, {
    method: "DELETE",
    //@ts-ignore
    "Content-Type": "application/json",
  })
  return (await res).json();
}


const getBlogById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/blogs/${id}`);
  const data = await res.json();
  return data.post;
}

const EditBlog = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    toast.loading("Fetching Blog Details 🚓", { id: "1" });
    getBlogById(params.id)
      .then((data) => {
        if (titleRef.current && descriptionRef.current) {
          titleRef.current.value = data.title;
          descriptionRef.current.value = data.description;
          toast.success("Fetching Complete", { id: "1" })
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error fetching blog", { id: "1" })
      })
  }, [])


  const handleUpdate = async (e: any) => {
    e.preventDefault();
    if (titleRef.current && descriptionRef.current) {
      toast.loading("Sending Request 🏃‍♂️", { id: "1" })
      await updateBlog({
        id: params.id,
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
      })
      toast.success("Blog Posted Successfully 🧘‍♂️", { id: "1" })
      setTimeout(() => {
        router.push('/');
      }, 3000);
    }
  };

  const handleDelete = async () => {
    toast.loading("Deleting Blog", { id: "2" })
    await deleteBlog(params.id)
    toast.success("Blog Deleted", { id: "2" });
    setTimeout(() => {
      router.push('/');
    }, 3000);
  }

  return (
    <>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <h1 className="text-3xl text-slate-200 font-bold p-3">
            Edit you blog 📝
          </h1>
          <form onSubmit={handleUpdate}>
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
            <div className="flex justify-between">
              <button className="font-semibold px-4 py-2 shadow-xl bg-slate-300 rounded-lg m-auto hover:bg-slate-100">
                Update
              </button>

            </div>
          </form>
          <button
            onClick={handleDelete}
            className="font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-red-500  mt-2">
            Delete
          </button>
        </div>
      </div>
    </>
  )
}

export default EditBlog
