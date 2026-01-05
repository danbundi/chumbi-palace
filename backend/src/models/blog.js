import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    authorName: {
      type: String,
      required: true,
    },

    image: {
      type: String, // file path or URL
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt = publish date
  }
);

export default mongoose.model("Blog", blogSchema);
