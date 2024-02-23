import { HiHome } from 'react-icons/hi';
import { Breadcrumb } from 'flowbite-react';
import { Flowbite } from 'flowbite-react';
const customTheme = {
         "breadcrumb": {
                "item": {
                    "base": "group flex items-center",
                    "chevron": "mx-1 h-4 w-4 text-gray-400 group-first:hidden md:mx-2",
                    "href": {
                        "off": "flex items-center text-sm font-medium text-white dark:text-gray-400",
                        "on": "flex items-center text-sm font-medium text-white hover:text-secondary dark:text-gray-400 dark:hover:text-white"
                    },
                    "icon": "mr-2 h-4 w-4"
                }
            }
        
     };

const BreadcrumbComponent = ({ type, page }) => {
    return (
        <Flowbite theme={{ theme: customTheme }}>

        {type === "signup" && page === "account" && (
            <Breadcrumb aria-label="Default breadcrumb account">
            <Breadcrumb.Item href="#" icon={HiHome}></Breadcrumb.Item>
            <Breadcrumb.Item href="#">Sign-Up</Breadcrumb.Item>
            <Breadcrumb.Item>Account</Breadcrumb.Item>
          </Breadcrumb>
        )}
        {type === "signup" && page === "profile" && (
            <Breadcrumb aria-label="Default breadcrumb profile">
            <Breadcrumb.Item href="#" icon={HiHome}></Breadcrumb.Item>
            <Breadcrumb.Item href="#">Sign-Up</Breadcrumb.Item>
            <Breadcrumb.Item>Account</Breadcrumb.Item>
            <Breadcrumb.Item>Profile</Breadcrumb.Item>
          </Breadcrumb>
        )}
        {type === "signin" && (
            <Breadcrumb aria-label="Default breadcrumb example">
            <Breadcrumb.Item href="#" icon={HiHome}></Breadcrumb.Item>
            <Breadcrumb.Item href="#">Sign-In</Breadcrumb.Item>
          </Breadcrumb>
        )}
      </Flowbite>
    )
}
export default BreadcrumbComponent;