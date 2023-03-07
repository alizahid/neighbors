import { useRouter } from 'expo-router'
import { type FunctionComponent } from 'react'
import { SectionList, View } from 'react-native'
import { useTranslations } from 'use-intl'

import { Icon, type IconName } from '~/components/common/icon'
import { Pressable } from '~/components/common/pressable'
import { Spinner } from '~/components/common/spinner'
import { Typography } from '~/components/common/typography'
import { Avatar } from '~/components/users/avatar'
import { useProfile } from '~/hooks/auth/profile'
import { useSignOut } from '~/hooks/auth/sign-out'
import { tw } from '~/lib/tailwind'

const Screen: FunctionComponent = () => {
  const router = useRouter()

  const t = useTranslations('screen.account')

  const { profile } = useProfile()
  const { loading, signOut } = useSignOut()

  return (
    <SectionList<
      {
        icon: IconName
        label: string
        loading?: boolean

        onPress: () => void
      },
      {
        title: string
      }
    >
      ListHeaderComponent={
        <Pressable
          onPress={() => router.push(`/users/${profile?.id}`)}
          style={tw`px-4 pt-4 pb-2 gap-4 flex-row items-center`}
        >
          <Avatar image={profile?.image} name={profile?.name} />

          <View style={tw`flex-1`}>
            <Typography>{profile?.name}</Typography>

            <Typography color="gray-11" size="sm">
              {profile?.email}
            </Typography>
          </View>
        </Pressable>
      }
      renderItem={({ item }) => (
        <Pressable
          onPress={item.onPress}
          style={tw`py-2 px-4 flex-row items-center gap-2`}
        >
          <Icon name={item.icon} style={tw`h-5 w-5`} />

          <Typography style={tw`flex-1`}>{item.label}</Typography>

          {item.loading ? (
            <Spinner />
          ) : (
            <Icon name="right" style={tw`h-5 w-5`} />
          )}
        </Pressable>
      )}
      renderSectionHeader={({ section }) => (
        <View style={tw`border-t border-gray-6 mt-2 pt-4 pb-2 pl-11 pr-4`}>
          <Typography color="gray-11" size="sm" weight="medium">
            {section.title}
          </Typography>
        </View>
      )}
      sections={[
        {
          data: [
            {
              icon: 'account',
              label: t('menu.account.profile'),
              onPress: () => router.push('/account/profile'),
            },
            {
              icon: 'buildings',
              label: t('menu.account.buildings'),
              onPress: () => router.push('/account/buildings'),
            },
          ],
          title: t('menu.account.title'),
        },
        {
          data: [
            {
              icon: 'exit',
              label: t('menu.security.exit'),
              loading,
              onPress: () => signOut(),
            },
          ],
          title: t('menu.security.title'),
        },
      ]}
      stickySectionHeadersEnabled={false}
    />
  )
}

export default Screen
