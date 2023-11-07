import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'

import { Permission, Response } from '@/types/ResponseType'
import { Tree } from 'antd'
import type { AntTreeNodeProps, DataNode } from 'antd/es/tree'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useQueryClient } from 'react-query'
import { appRequest } from '@/service'
import { roleListKeys } from '@/keys'

interface IProps {
  children?: ReactNode
  data: Permission[]
  permissions: number[]
  roleId: number
  setSelectedPermissionsModalOpen: (selectedPermissionsModalOpen: boolean) => void
}

const TreeView: FC<IProps> = memo(({ data, permissions, setSelectedPermissionsModalOpen, roleId }) => {
  let allKeys: React.Key[] = []
  const getAllkeys: (data: Permission[]) => React.Key[] = (data: Permission[]) => {
    data.forEach((item) => {
      allKeys.push(item.id)
      if (item.children) {
        getAllkeys(item.children)
      }
    })
    return allKeys
  }

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(getAllkeys(data))
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(permissions)
  const queryClient = useQueryClient()
  const generateDataNode: (data: Permission[]) => DataNode[] = (data: Permission[]) => {
    return data.map((item) => {
      return {
        title: item.authName,
        key: item.id,
        children: item.children && generateDataNode(item.children)
      }
    })
  }
  const treeData: DataNode[] = generateDataNode(data)

  const onExpand = (expandedKeysValue: React.Key[]) => {
    setExpandedKeys(expandedKeysValue)
  }

  const onCheck = (checkedKeysValue: any) => {
    setCheckedKeys(checkedKeysValue)
  }
  const getSwitcherIcon = (props: AntTreeNodeProps) => {
    if (props.expanded) {
      return <RemoveIcon />
    }

    return <AddIcon />
  }
  const handleSubmitPermmisions = () => {
    queryClient
      .fetchQuery({
        queryFn: () =>
          appRequest.post<Response<null>>(`/roles/${roleId}/rights`, { data: { rids: checkedKeys.join(',') } }),
        staleTime: 0
      })
      .then((res) => {
        queryClient.invalidateQueries(roleListKeys.lists())
        setSelectedPermissionsModalOpen(false)
        document.body.style.overflow = 'auto'
        console.log(res, 'res')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div>
      <Tree
        className="text-stone-800"
        checkable
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        treeData={treeData}
        switcherIcon={getSwitcherIcon}
        selectable={false}
      />
      <div className="flex justify-end mt-4">
        <Button
          className="hover:bg-stone-100"
          variant="outlined"
          color="success"
          onClick={() => setSelectedPermissionsModalOpen(false)}
        >
          취소
        </Button>
        <Button className="ml-4" variant="contained" color="success" onClick={handleSubmitPermmisions}>
          확인
        </Button>
      </div>
    </div>
  )
})

export default TreeView

TreeView.displayName = 'TreeView'
