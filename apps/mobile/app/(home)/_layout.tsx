import { Tabs, useFocusEffect, useNavigation } from 'expo-router'
import { type FunctionComponent } from 'react'
import { useTranslations } from 'use-intl'

import { Icon } from '~/components/common/icon'
import { StackHeader } from '~/components/navigation/header'
import { TabBar } from '~/components/navigation/tab-bar'

const Layout: FunctionComponent = () => {
  const navigation = useNavigation()

  const t = useTranslations('screen')

  useFocusEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  })

  return (
    <Tabs
      screenOptions={{
        header: (props) => <StackHeader {...props} />,
        tabBarShowLabel: false,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon color={focused ? 'primary-9' : 'gray-9'} name="home" />
          ),
          title: t('home.title'),
        }}
      />

      <Tabs.Screen
        name="market"
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon color={focused ? 'primary-9' : 'gray-9'} name="market" />
          ),
          title: t('market.title'),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon color={focused ? 'primary-9' : 'gray-9'} name="chat" />
          ),
          title: t('chat.title'),
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon color={focused ? 'primary-9' : 'gray-9'} name="account" />
          ),
          title: t('account.title'),
        }}
      />
    </Tabs>
  )
}

export default Layout
