import React from 'react'
import Link from 'next/link'
import type { Feature } from '../content/features'

type FeatureProps = {
  feature: Omit<Feature, 'page'>
  // include feature description
  detailed?: boolean
}

const DetailedFeatureInner = (props: { feature: FeatureProps['feature'] }) => {
  const { Icon, name, description } = props.feature
  return (
    <>
      <div className="inline-flex items-center space-x-3">
        <div className="flex items-center justify-center bg-black rounded-full bg-opacity-5 w-9 h-9 icon-circle">
          <Icon
            className="h-8 w-8 dark:text-white flex-shrink-0 rounded-full p-1.5 text-black block dark:stroke-pink-200"
            aria-hidden="true"
          />
        </div>
        <h3 className="m-0 text-lg font-semibold leading-6 tracking-tighter text-gray-900 dark:text-white">
          {name}
        </h3>
      </div>
      <div>
        <p className="mt-2 text-base font-medium leading-7 text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
    </>
  )
}

const featureWrapperClasses = `relative block overflow-hidden p-10 bg-white shadow-lg rounded-xl dark:bg-opacity-5 no-underline text-black dark:text-white`

export const DetailedFeatureLink = (props: {
  href: string
  feature: FeatureProps['feature']
}) => {
  return (
    <Link href={props.href}>
      <a className={featureWrapperClasses}>
        <DetailedFeatureInner feature={props.feature}></DetailedFeatureInner>
      </a>
    </Link>
  )
}

export default function Feature(props: FeatureProps) {
  const { feature, detailed = false } = props
  const { Icon, name } = feature

  if (detailed) {
    return (
      <div className={featureWrapperClasses}>
        <DetailedFeatureInner feature={feature} />
      </div>
    )
  }
}
