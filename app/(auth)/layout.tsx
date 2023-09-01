const Layout = ({ children }: React.PropsWithChildren<{}>) => {
    return (
        <div className="h-full flex items-center justify-center">
            {children}
        </div>
    )
}

export default Layout
