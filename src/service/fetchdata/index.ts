import { UsersListQuery } from '@/types/RequestType'
import { useQuery } from 'react-query'
import { appRequest } from '..'
import { Permission, Response, RoleParent, SearchRole, SearchUser, UserListType } from '@/types/ResponseType'
import { permissionKeys, roleListKeys, userListKeys } from '@/keys'
import type { SearchType } from '@/types'
import { queryClient } from '@/router'

/**
 *
 * USER FETCHING
 */
export const useUserList = (queryObj: UsersListQuery, isKeywordFocused: boolean) => {
  const { data, isFetching, refetch, isLoading } = useQuery({
    queryKey: userListKeys.list(queryObj),
    queryFn: () => appRequest.get<Response<UserListType>>('/users', { params: queryObj }),
    select: (data) => data.data,
    enabled: !isKeywordFocused
  })
  return { data, isFetching, refetch, isLoading }
}

export const getSearchUser = (searchId: string) => {
  return queryClient.fetchQuery({
    queryKey: userListKeys.search(searchId),
    queryFn: () => appRequest.get<Response<SearchUser>>(`/users/${searchId}`)
  })
}
/**
 *
 * ROLE FETCHING
 */
export const useRoleList = () => {
  return useQuery({
    queryKey: [...roleListKeys.lists()],
    queryFn: () => appRequest.get<Response<RoleParent[]>>('/roles'),
    select: (data) => data.data.data
  })
}

export const getSearchRole = (rid: string) => {
  return queryClient.fetchQuery({
    queryKey: roleListKeys.search(rid),
    queryFn: () => appRequest.get<Response<SearchRole>>(`/roles/${rid}`)
  })
}

export const getSearchData = async (type: SearchType, searchID: string) => {
  if (type === 'USER') {
    return await getSearchUser(searchID)
  } else if (type === 'ROLE') {
    return await getSearchRole(searchID)
  }
}

/**
 *
 * PERMISSION FETCHING
 */

export const usePermission = () => {
  return useQuery({
    queryKey: [...permissionKeys.all, 'list'],
    queryFn: () => appRequest.get<Response<Permission[]>>('/rights/tree')
  })
}
