import { type NextPage } from 'next'
import { useTranslations } from 'next-intl'

const Page: NextPage = () => {
  const t = useTranslations('screen.home')

  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold text-primary-11">{t('title')}</h1>
    </div>
  )
}

export default Page
