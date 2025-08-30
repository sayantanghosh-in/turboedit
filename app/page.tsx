import { Editor } from "@/components/Editor";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  return (
    <>
      <Toaster />
      <div>
        <section className=" px-2 md:px-32 lg:px-64">
          <Editor />
        </section>
      </div>
    </>
  );
}
