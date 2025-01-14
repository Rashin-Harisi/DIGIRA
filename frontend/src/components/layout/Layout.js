import React from 'react'

const Layout = ({children}) => {
  return (
    <div className='w-[95vw] m-auto my-[20px] bg-[#132A12] px-[10px] flex flex-col min-h-[900px] lg:h-[95vh]'>
        <header className='w-full h-[100px] border-b border-[#ECF39E]'>header</header>
        <div className='flex-grow py-4'>{children}</div>
        <footer className='w-full h-[50px] border-t border-[#ECF39E]'>footer</footer>
    </div>
  )
}

export default Layout