import { type NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const Page: NextPage = () => {
  const t = useTranslations('screen.landing')

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-32 px-4 pt-32 lg:mx-auto lg:max-w-5xl">
      <Head>
        <title>{`${t('title')}: ${t('description')}`}</title>
      </Head>

      <header className="flex flex-col items-center justify-center text-center">
        <h1 className="mt-4 text-4xl font-bold">{t('title')}</h1>

        <h2 className="font-medium text-gray-11">{t('description')}</h2>
      </header>

      <main className="flex flex-col gap-32">
        <section className="flex flex-col gap-16 lg:flex-row">
          <article className="flex flex-col gap-4 text-center">
            <h3 className="text-xl font-semibold">{t('home.title')}</h3>

            <Image
              alt={t('home.title')}
              height={1989}
              priority
              src="/img/1-home.png"
              width={976}
            />
          </article>

          <article className="flex flex-col gap-4 text-center">
            <h3 className="text-xl font-semibold">{t('post.title')}</h3>

            <Image
              alt={t('post.title')}
              height={1989}
              src="/img/2-post.png"
              width={976}
            />
          </article>

          <article className="flex flex-col gap-4 text-center">
            <h3 className="text-xl font-semibold">{t('chat.title')}</h3>

            <Image
              alt={t('chat.title')}
              height={1989}
              src="/img/3-chat.png"
              width={976}
            />
          </article>
        </section>

        <section className="flex justify-center">
          <div className="flex h-12 items-center justify-center rounded-full bg-primary-9 px-4 font-semibold text-gray-1">
            {t('beta')}
          </div>
        </section>
      </main>

      <footer>
        <p className="text-sm text-gray-11">
          {t('footer.copyright', {
            year: new Date(),
          })}
        </p>
      </footer>

      <Image
        alt="Hero image"
        className="w-64"
        height={2778 / 4}
        src="/img/hero.png"
        width={1284 / 4}
      />
    </div>
  )
}

export default Page
