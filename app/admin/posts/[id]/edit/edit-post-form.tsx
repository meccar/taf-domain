"use client";

import { updatePostAction } from "../../actions";
import { PostForm, type TranslationDraft } from "@/components/admin/post-form";

interface PostWithTranslations {
  id: string;
  category: string;
  status: "draft" | "published";
  featured: boolean;
  post_translations: {
    locale: string;
    title: string;
    excerpt: string;
    content: string | null;
    author: string;
  }[];
}

export function EditPostForm({ post }: { post: PostWithTranslations }) {
  const emptyDraft: TranslationDraft = {
    title: "",
    excerpt: "",
    content: "",
    author: "TAF Việt",
  };

  // Build the { vi: {...}, en: {...} } shape PostForm expects, pre-filled from existing DB rows
  const translations: Record<string, TranslationDraft> = {
    vi: { ...emptyDraft },
    en: { ...emptyDraft },
  };

  for (const t of post.post_translations) {
    translations[t.locale] = {
      title: t.title,
      excerpt: t.excerpt,
      content: t.content ?? "",
      author: t.author,
    };
  }

  return (
    <PostForm
      initialValues={{
        category: post.category,
        status: post.status,
        featured: post.featured,
        translations: translations as any,
      }}
      onSubmit={(values) =>
        updatePostAction(post.id, {
          category: values.category as any,
          status: values.status,
          featured: values.featured,
          translations: values.translations,
        })
      }
      submitLabel="Cập nhật bài viết"
    />
  );
}
