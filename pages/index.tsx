import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import utilStyles from "../components/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Date from "../components/date";
import { GetStaticProps } from "next";

export default function Home({ allPostsData }: HomeProps) {
  return (
    <Layout home>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hey there! I'm <strong>Twinkle</strong>. I'm currently sitting down in
          this cozy carton box.
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>{getPostsUI()}</ul>
      </section>
    </Layout>
  );

  function getPostsUI() {
    return allPostsData.map(({ id, date, title }: PostData) => (
      <li className={utilStyles.listItem} key={id}>
        <Link href="/posts/[id]" as={`/posts/${id}`}>
          <a>{title}</a>
        </Link>
        <br />
        <small className={utilStyles.lightText}>
          <Date dateString={date} />
        </small>
      </li>
    ));
  }
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

interface HomeProps {
  allPostsData: PostData[];
}
