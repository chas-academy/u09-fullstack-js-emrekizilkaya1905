import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        "https://yt3.googleusercontent.com/9FLDvEwtAPg2ZIxe_dmKza6QWO7ktpCEiA9gQ4KsAF-q6J906vzOMBpfOKbMAZF5iRBy9PNOyzw=s900-c-k-c0x00ffffff-no-rj",
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", postSchema);

export default Post;
