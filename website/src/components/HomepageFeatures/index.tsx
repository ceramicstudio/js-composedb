import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

type FeatureItem = {
  title: string
  Svg: React.ComponentType<React.ComponentProps<'svg'>>
  description: JSX.Element
}

const FeatureList: FeatureItem[] = [
  {
    title: 'Scale your data',
    Svg: require('@site/static/img/undraw_to_the_stars.svg').default,
    description: <>Ceramic is built for fast write times and an abundance of data transactions.</>,
  },
  {
    title: 'Build faster',
    Svg: require('@site/static/img/undraw_composition.svg').default,
    description: <>One simple GraphQL interface and an ecosystem of open source data models.</>,
  },
  {
    title: 'Plug into a data ecosystem',
    Svg: require('@site/static/img/undraw_connected_world.svg').default,
    description: <>Easily share data between applications.</>,
  },
]

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
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
  )
}
