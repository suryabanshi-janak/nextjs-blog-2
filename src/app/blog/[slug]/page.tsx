import { notFound } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';
import { Mdx } from '@/components/mdx-components';

import '@/styles/mdx.css';

interface Props {
  params: {
    slug: string;
  };
}

async function getPostFromParams(slug: string) {
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) notFound();

  return post;
}

async function page({ params }: Props) {
  const post = await getPostFromParams(params.slug);

  return (
    <article className='container relative max-w-3xl py-6 lg:py-10'>
      <Mdx code={post.body.code} />
    </article>
  );
}

export default page;
