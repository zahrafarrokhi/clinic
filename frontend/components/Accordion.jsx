import { ChevronLeft } from '@mui/icons-material';
import React, { Children, useMemo, useState } from 'react'

export default function Accordion(props) {
  const { className, children } = props
  const [open, setOpen] = useState(false);

  const allChildren = useMemo(() => Children.toArray(children), [children])
  const firstChild = useMemo(() => Children.toArray(children)[0], [children, allChildren])

  return (
    <div className={className}>
      {React.cloneElement(firstChild, { onClick: (e) => setOpen(o => !o), className: `${firstChild.props.className} items-center justify-between flex`}, [
        firstChild.props.children,
        <ChevronLeft className={`transition-all duration-300 ${open ? 'rotate-90' : '-rotate-90'}`}/>

      ])}
      {open && allChildren.filter((item, index) => index > 0)}
    </div>
  )
}
