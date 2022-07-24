import React, { useState } from 'react';

import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

const Svg = require('@site/static/svg/undraw_trip_re_f724.svg').default;

function HomepageHeader() {
  const [width, setWidth] = useState(window.innerWidth);
  window.onresize = () => {
    setWidth(window.innerWidth);
  };

  const { siteConfig } = useDocusaurusContext();
  return (
    // <header className={clsx("hero hero--primary", styles.heroBanner)}>
    //   <div className="container">
    //     <h1 className="hero__title">{siteConfig.title}</h1>
    //     <p className="hero__subtitle">{siteConfig.tagline}</p>
    //     <div className={styles.buttons}>
    //       <Link
    //         className="button button--secondary button--lg"
    //         to="/docs/intro"
    //       >
    //         😎🏀🎉🎶💻💰💛🏞️🛣️
    //       </Link>
    //     </div>
    //   </div>
    // </header>
    <div className={styles.box}>
      {/* <Svg className={styles.svg}></Svg> */}
      {width > 1000 && (
        <div className={styles.slogan}>
          大多数问题的答案不是布尔值，并不是True Or False
        </div>
      )}
      {width > 1000 ? (
        <div className={styles.left} style={{ fontSize: 25 }}>
          向兴强的生活沉淀站
        </div>
      ) : (
        <div className={styles.left}>向兴强的生活沉淀站</div>
      )}
    </div>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description='Description will go into a meta tag in <head />'
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
