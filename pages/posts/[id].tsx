import Head from "next/head";
import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/date";
import styles from "../../components/utils.module.css";
import { GetStaticPaths, GetStaticProps } from "next";

export default function Post({ postData }: PostProps) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <h1 className={styles.headingXl}>{postData.title}</h1>
        <div className={styles.lightText}>
          <Date dateString={postData.date} />
        </div>
      </article>

      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getAllPostIds(),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;

  if (typeof id === "string") {
    const postData: PostData = await getPostData(id);
    return {
      props: {
        postData,
      },
    };
  }

  return {
    props: {},
  };
};
interface PostProps {
  postData: PostData;
}
