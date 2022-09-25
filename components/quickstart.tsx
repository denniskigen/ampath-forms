import React from 'react'
import {
  BookOpenIcon,
  LightBulbIcon,
  ServerIcon,
  SparklesIcon,
} from '@heroicons/react/outline'
import { DetailedFeatureLink } from './feature'

export const QuickStartArea = () => {
  return (
    <div className="grid grid-cols-1 mt-12 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:gap-x-8 lg:gap-y-12">
      <DetailedFeatureLink
        feature={{
          Icon: SparklesIcon,
          description: `Build a brand new form schema powered by AMPATH Forms.`,
          name: 'Create a new form',
        }}
        href="/docs/getting-started/create-new-form"
      ></DetailedFeatureLink>
      <DetailedFeatureLink
        feature={{
          Icon: ServerIcon,
          description: `Load and modify an existing form schema from your server.`,
          name: 'Edit an existing form',
        }}
        href="/docs/getting-started/edit-existing-form"
      ></DetailedFeatureLink>

      <DetailedFeatureLink
        feature={{
          Icon: BookOpenIcon,
          description: `Learn the fundamental concepts behind AMPATH Forms.`,
          name: 'Read the core concepts',
        }}
        href="/docs/core-concepts/forms"
      ></DetailedFeatureLink>
      <DetailedFeatureLink
        feature={{
          Icon: LightBulbIcon,
          description: `Find out what possibilities AMPATH Forms offers for power users.`,
          name: 'Developer guide',
        }}
        href="/docs/developer-guide/deploy-form-builder"
      ></DetailedFeatureLink>
    </div>
  )
}
