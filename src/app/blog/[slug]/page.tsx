import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { allAuthors, allPosts } from 'contentlayer/generated';
import { Mdx } from '@/components/mdx-components';

import '@/styles/mdx.css';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

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

  const authors = post.authors.map((author) =>
    allAuthors.find(({ slug }) => slug === `/authors/${author}`)
  );

  return (
    <article className='container relative max-w-3xl py-6 lg:py-10'>
      <div>
        {post.date && (
          <time
            dateTime={post.date}
            className='block text-sm text-muted-foreground'
          >
            Published on {formatDate(post.date)}
          </time>
        )}
        <h1 className='mt-2 inline-block font-bold text-4xl leading-tight'>
          {post.title}
        </h1>
        {authors.length ? (
          <div className='mt-4 flex space-x-4'>
            {authors.map((author) =>
              author ? (
                <Link
                  key={author._id}
                  href={`https://twitter.com/${author.twitter}`}
                  className='flex items-center space-x-2 text-sm'
                >
                  <Image
                    src={author.avatar}
                    alt={author.title}
                    width={42}
                    height={42}
                    className='rounded-full bg-white'
                  />
                  <div className='flex-1 text-left leading-tight'>
                    <p className='font-medium'>{author.title}</p>
                    <p className='text-[12px] text-muted-foreground'>
                      @{author.twitter}
                    </p>
                  </div>
                </Link>
              ) : null
            )}
          </div>
        ) : null}
      </div>
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={720}
          height={405}
          className='my-8 rounded-md border bg-muted transition-colors'
          priority
        />
      )}
      <Mdx code={post.body.code} />
      <hr className='mt-12' />
      <div className='flex justify-center py-10'>
        <Link
          href='/blog'
          className='flex items-center hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium h-10 py-2 px-4 transition-colors'
        >
          <ChevronLeft className='mr-2 h-4 w-4' />
          See all posts
        </Link>
      </div>
    </article>
  );
}

export default page;
