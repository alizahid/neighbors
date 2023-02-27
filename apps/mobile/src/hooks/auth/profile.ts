import { trpc } from '~/lib/trpc'

export const useProfile = () => {
  const { data, isLoading, refetch } = trpc.users.profile.useQuery()

  return {
    loading: isLoading,
    profile: data,
    refetch,
  }
}
