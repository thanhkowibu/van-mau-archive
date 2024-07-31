import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Textarea } from "../../ui/textarea";
import { useState } from "react";
import toast from "react-hot-toast";
import { cn } from "../../../lib/utils";
import TagsInput from "../input/TagsInput";
import usePostApi from "../../../api/modules/post.api";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreatePostModal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const { addPost } = usePostApi();

  const minWordValidate = (minWords: number) => {
    return z.string().refine(
      (value) => {
        const wordCount = value.trim().split(/\s+/).length;
        return wordCount >= minWords;
      },
      {
        message: `Text must be longer than ${minWords} words`,
      }
    );
  };

  const formSchema = z.object({
    content: minWordValidate(20),
    tags: z.array(z.string()),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      tags: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (loading) return;
    values.tags = tags;
    if (tags.length < 1) {
      toast.error("Need at least 1 tag");
      return;
    }
    if (tags.length > 3) {
      toast.error("Accept at most 3 tags");
      return;
    }

    console.log(values);
    setLoading(true);
    try {
      const { content, tags } = values;
      const res = await addPost(content, tags);
      toast.success(res.data);
      setIsOpen(false);
      setTags([]);
      form.reset();
      window.location.reload();
    } catch (err: any) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          tabIndex={-1}
          aria-hidden="true"
          className="flex bg-black/30 backdrop-blur-[1px] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative p-4 w-full max-w-3xl max-h-full"
          >
            {/* Modal content */}
            <div className="relative rounded-lg shadow bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                <h3 className="text-xl font-semibold text-white">
                  Write your copypasta🔥🔥✍️
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
                  data-modal-hide="authentication-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:px-6 md:py-4">
                <Form {...form}>
                  <form
                    className="space-y-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                    onKeyDown={handleKeyDown}
                  >
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block mb-2 text-sm font-medium text-white text-start">
                            Content
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              className="text-sm rounded-lg block w-full h-80 p-2.5 bg-gray-600 border-gray-500 focus:border-gray-600 placeholder-gray-400 text-white ring-offset-gray-400"
                              placeholder="OH NAGI-CHAMA, CAN I ASK YOU A FAVOR🥺PLEASE LET ME HAVE A TASTE OF YOUR FINEST TEA🤤N-NO, I DON’T MEAN THOSE TEA, I MEAN YOUR TEA😤I WANT TO ENJOY EVERY SINGLE DROP WHILE INHALING THAT SWEET AROMA🥵😤🤤AND MAYBE EVEN GO THROUGH THAT BLACK TIGHT FILTER WOULD BE THE BEST😍AAAAAHHHHH🤤🤤🤤I CAN ALREADY IMAGINE SO MANY OF NAGI-CHAMA TASTE IN MY MOUTH🥵🥵🥵🥵😳😳😳😳😳e-etou, Nagi-chama😦w-why is your face suddenly go super scary😧I-I don’t like the look of your eyes right now😰e-eh😨eh😨eh😨eh😨eh😨eh😨p-please, calm down😣don’t move that fast, you’re gonna drip😵‍💫I-I know you’re angry at me bu- w-w-wait, y-you’re so strong😨😨w-w-WAIT, NAGI-CHAMA WHY ARE YOU SUDDEN- 😱😱😱😱😱😶😶😶😶😶😶😶
HHHHHHHHHHHHHHHHHRRRRRRRRRRRRRRRMMMMMMMMMMMMMMMMMMMPPPPPPPPPPPPPPPPPPPPPPPPPPPPP😳😳😳HMRP😵‍💫😵‍💫😵‍💫GLUCK🫖GLUCK🫖GLUCK🫖CHOKE😫GLUCK🍵GLUCK🍵GLUCK🍵CHOKE😫GLUCK🍵SLURP😋SLURP😋SLURP😋CHOKE😫GLUCK🫖GLUCK🍵GLUCKCHOKE😫CHOKE😫GLUCK🫖SLURP😋GLUCK🍵GLUCK🫖CHOKE😫SLURP😋CHOKE😫CHOKE😫SLURP"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="tags"
                      render={() => (
                        <FormItem>
                          <FormLabel className="block mb-2 text-sm font-medium text-white text-start">
                            Tags
                          </FormLabel>
                          <TagsInput tags={tags} setTags={setTags} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <button
                      className={cn(
                        "w-full text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-sky-500 hover:bg-sky-600",
                        {
                          "bg-gray-600 hover:bg-gray-600 select-none cursor-progress":
                            loading,
                        }
                      )}
                      disabled={loading}
                    >
                      Upload
                    </button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePostModal;
