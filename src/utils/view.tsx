import { GenerateTreeDataProps, TreeDataChild } from '@/types'
import { ArrowRightOutlined } from '@mui/icons-material'
import { HTMLProps, ReactElement, ReactNode, cloneElement } from 'react'

const checkHasChildren = (treeChild: TreeDataChild<unknown>[]) => {
  for (const item of treeChild) {
    if (item.children) {
      return true
    }
    return false
  }
}
const generateBorderClass = (treeChild: TreeDataChild<unknown>[], index: number) => {
  let borderClass = ''
  if (checkHasChildren(treeChild)) {
    borderClass += 'border-stone-200 border border-solid border-t-0 border-l-0 border-r-0'
    if (treeChild.length === index + 1) {
      borderClass += ' border-b-0'
    }
  }
  return borderClass
}

export const generateTreeData = (treeData: TreeDataChild<unknown>[], props: GenerateTreeDataProps) => {
  const { flatLastChild, element, elementProps, arrow } = props
  return (
    <div className={flatLastChild ? '' : 'flex flex-row flex-wrap m-w-[1000px]'}>
      {treeData.map((treeChild, i) => (
        <div
          key={treeChild.id}
          className={`flex items-center ${flatLastChild ? generateBorderClass(treeData, i) : ''}`}
        >
          {cloneElement(element, { treeChild, ...elementProps })}
          {arrow ? <ArrowRightOutlined /> : <></>}
          {treeChild.children && generateTreeData(treeChild.children, { element })}
        </div>
      ))}
    </div>
  )
}
