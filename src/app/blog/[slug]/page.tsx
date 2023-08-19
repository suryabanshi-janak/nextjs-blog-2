import { notFound } from 'next/navigation';
import { allDocs } from 'contentlayer/generated';

interface Props {
  params: {
    slug: string;
  };
}

async function getDocFromParams(slug: string) {
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);

  if (!doc) notFound();

  return doc;
}

async function page({ params }: Props) {
  const doc = await getDocFromParams(params.slug);

  return <div>{JSON.stringify(doc)}</div>;
}

export default page;
