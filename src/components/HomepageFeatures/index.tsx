import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

type FeatureItem = {
  title: string;
  route: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: '技术文章',
    route: '/blog',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
       前后端技术文章/笔记/思考
      </>
    ),
  },
  {
    title: '生活碎片',
    route: '/docs/intro',
    Svg: require('@site/static/img/undraw_augmented_reality_re_f0qd.svg').default,
    description: (
      <>
        记录自己的成长\思考\认知
      </>
    ),
  },
  {
    title: '投资自己',
    route: '/blog',
    Svg: require('@site/static/img/undraw_road_to_knowledge_m8s0.svg').default,
    description: (
      <>
        读书\影视等
      </>
    ),
  },
];

function Feature({title, Svg, description, route}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3><Link to={route}>{title}</Link> </h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
