import { type NextPage } from 'next'
import { useTranslations } from 'next-intl'

const Page: NextPage = () => {
  const t = useTranslations('screen.landing')

  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold text-primary-11">
        {t.rich('title', {
          accent: (text) => (
            <span className="text-4xl font-bold text-accent-11">{text}</span>
          ),
          primary: (text) => (
            <span className="text-4xl font-bold text-primary-11">{text}</span>
          ),
        })}
      </h1>
    </div>
  )
}

export default Page
