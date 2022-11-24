# breadcrumb-provider

Usually at the top of a page somewhere, breadcrumbs allow a user to see where they are on your website/application.  For example, on this website you see at the top a link to Home, then a link to Articles, then the name of this article (not a link, as we're on that page).  On _this_ website, I'm using React as a front end framework so to build the breadcrumbs for each page I've written a BreadcrumbProvider to make is nice and easy to manage them.

All the files for this are included in this repository for you to read and implement yourself.  This is not a package to just import and use.

### The Goal

I want to be able to have as simple a piece of code as possible to configure breadcrumbs on my website.  The way I have the site set up is that the header, nav (breadcrumbs go here), and footer are "global" then each individual page is stuffed in the middle somewhere.  This means I can't just render the breadcrumbs in the page, I need a programmatic way to push them up the tree.

### The Setup

So now we know what we're looking to achieve, I think I'll need:
1. A `Context` to _store_ the data
2. A `Provider` to _share_ the data
3. A `Hook` as a way to create a named shortcut to set the data
4. Some `Components` to render

#### Context

Nice and easy, I use the default value here to hint to myself more than anything.  For those that don't know, the value here is what's used if you accidentally try and use this outside of it's Provider in the component tree.

```
export const BreadcrumbContext = React.createContext({
    setBreadcrumbs: () => {}
})
```

As you can see, we'll be exposing a function called `setBreadcrumbs`.  Hopefully it doesn't take a genius to understand what that'll do.

#### Provider

Creating a Provider is easy, the code is just a component:

```
<BreadcrumbContext.Provider value={}>
    ...
</BreadcrumbContext.Provider>
```

Which is all well and good, but I like to take that a step further and create a provider component that wraps all that logic, so this is mine:

```
export default function BreadcrumbProvider({ children }) {
    const [breadcrumbs, setBreadcrumbs] = useState([])
    const providerValue = {
        setBreadcrumbs
    }

    return (
        <BreadcrumbContext.Provider value={providerValue}>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            {children}
        </BreadcrumbContext.Provider>
    )
}
```

Hopefully we're still in easy-to-follow land here.  This component just wraps the "extras" of creating a *Context.Provider component, pipes in the `setBreadcrumbs` function, and in a lazy shortcut I've just added the actual Breadcrumbs container component here to save me manually adding that somewhere else.

The last part is not something I would do if this were a package for others to use - it's specific to _my_ website (and therefore doesn't belong here, but for simplicity of my own solution, I'm willing to be in the wrong).

#### Hook

The purpose of this hook is to prevent this code in each component I want to set the Breadcrumbs in:

```
const { setBreadcrumbs } = useContext(BreadcrumbContext)
```

I think it's just personal taste, but I'm not a fan of writing out the useContext line as it's not super-specific what it does.  Instead, I write this:

```
const setBreadcrumbs = useBreadcrumbs()
```

I find that much nicer.  It's only 1 import instead of 2, and it's got breadcrumbs written all over it.  That's achieved with this very simple hook:

```
export default function useBreadcrumbs() {
    const { setBreadcrumbs } = useContext(BreadcrumbContext)
    return setBreadcrumbs
}
```

Literally just a shortcut to the `useContext` call and an object destructuring.  Nothing really to see here.

#### Components

The final part are the ancillary components that are actually rendered on the page.  For my website I have a `<Breadcrumbs` component that is just a `<ul>` that outputs its children.

Then there are the `<Breadcrumb>`s themselves - these are `<li>` elements that have `text` and optional `link` props to control how they appear.